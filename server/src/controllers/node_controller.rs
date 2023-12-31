use crate::utils::errors::ServerApiError;
use crate::{
    models::node::SimulatedNode, types::EdgeSelectable, utils::query_utils::ToEdgedbQuery,
};
use axum::{extract::State, response::Result as AxumResult, Json};
use serde::Deserialize;

#[derive(Default, Clone, Deserialize)]
pub struct AddNewNode {
    name: Option<String>,
    address: String,
    dns: Option<String>,
}

impl ToEdgedbQuery for AddNewNode {
    fn to_query(&self) -> String {
        return String::from(
            "INSERT Node { name := <str>$0 , dns := <str>$1 , address :=<str>$2 };",
        );
    }
}

// add_new_node: Add new node to the simulated network
pub async fn add_new_node(
    State(edgedb_client): State<edgedb_tokio::Client>,
    Json(payload): Json<AddNewNode>,
) -> AxumResult<Json<SimulatedNode>> {
    let query = payload.to_query();
    let node_result: Option<SimulatedNode> = edgedb_client
        .query_single(
            query.as_str(),
            &(
                payload.name,
                payload.dns,
                payload.address,
                Vec::<String>::default(),
            ),
        )
        .await
        .map_err(ServerApiError::EdgeDBQueryError)
        .unwrap();
    let data = node_result
        .ok_or(ServerApiError::ObjectNotFound("Node".into()))
        .unwrap();
    Ok(Json(data))
}

#[derive(Default, Clone, Deserialize)]
pub struct AddNodeKeyStore {
    node_id: String,
    pair_pubkey: String,
}

impl ToEdgedbQuery for AddNodeKeyStore {
    fn to_query(&self) -> String {
        return String::from("UPDATE Node FILTER Node.id = <str>$0 SET { keystore += <str>$1}");
    }
}

pub async fn add_node_keystore(
    State(edgedb_client): State<edgedb_tokio::Client>,
    Json(payload): Json<AddNodeKeyStore>,
) -> AxumResult<Json<SimulatedNode>> {
    let query = &payload.to_query();
    let node_result: Option<SimulatedNode> = edgedb_client
        .query_single(query, &(payload.node_id, payload.pair_pubkey))
        .await
        .map_err(ServerApiError::EdgeDBQueryError)
        .unwrap();

    let data = node_result
        .ok_or(ServerApiError::ObjectNotFound("Node".into()))
        .unwrap();

    Ok(Json(data))
}

#[derive(Default)]
pub struct GetAllNodes {}

impl ToEdgedbQuery for GetAllNodes {
    fn to_query(&self) -> String {
        let fields = SimulatedNode::fields_as_shape();
        println!("Fields: {:?}", fields);
        return format!("SELECT Node {fields};");
    }
}

pub async fn get_all_nodes(
    State(edgedb_client): State<edgedb_tokio::Client>,
) -> AxumResult<Json<Vec<SimulatedNode>>> {
    let query = &GetAllNodes::default().to_query();

    let result = edgedb_client
        .query(query, &())
        .await
        .map_err(|err| {
            let err_result = ServerApiError::EdgeDBQueryError(err);
            tracing::error!("ERROR [get_all_nodes]: {}", err_result);
            err_result
        })
        .unwrap();

    Ok(Json(result))
}
