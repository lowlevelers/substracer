use sc_service::ChainSpec;

// Server configuration
#[derive(Debug)]
pub struct ServerConfiguration {
    chain_spec: Box<dyn ChainSpec>,
}

impl ServerConfiguration {
    pub fn new(chain_spec: Box<dyn ChainSpec>) -> Self {
        ServerConfiguration { chain_spec }
    }
}
