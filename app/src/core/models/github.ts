export const enum ContributionLevel {
  Null = 'Null',
  NONE = 'NONE',
  FIRST_QUARTILE = 'FIRST_QUARTILE',
  SECOND_QUARTILE = 'SECOND_QUARTILE',
  THIRD_QUARTILE = 'THIRD_QUARTILE',
  FOURTH_QUARTILE = 'FOURTH_QUARTILE',
}

export const enum ErrorType {
  BadCredentials,
  BadRequest,
}

export const enum GraphSize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

export const enum DisplayName {
  Username = '0',
  ProfileName = '1',
}

export type Themes =
  | 'GitHub'
  | 'GitHubDark'
  | 'Winter'
  | 'GitLab'
  | 'GitLabDark'
  | 'Halloween'
  | 'Dracula'
  | 'Slate'
  | 'Rose'
  | 'Indigo'
  | 'Emerald'
  | 'Sky'
  | 'Amber';

export interface Theme {
  name: Themes;
  textColor: string;
  levelColors: [
    level_0: string,
    level_1: string,
    level_2: string,
    level_3: string,
    level_4: string
  ];
  background: string;
  mode?: 'light' | 'dark';
}

export type GitHubUsername = string;
export type ContributionYear = number;

export interface GitHubUser {
  name?: string;
  login: GitHubUsername;
  avatarUrl: string;
  contributionsCollection: {
    years: ContributionYear[];
  };
}

export interface GitHubContributionCalendar {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar;
  };
}

export interface ContributionBasic {
  name?: string;
  login: GitHubUsername;
  avatarUrl: string;
  contributionYears: ContributionYear[];
}

export interface ContributionDay {
  level: `${ContributionLevel}`;
  weekday?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ContributionCalendar {
  total: number;
  year: number;
  weeks: {
    days: ContributionDay[];
  }[];
}

export interface GraphData extends ContributionBasic {
  contributionCalendars: ContributionCalendar[];
}

export interface ResponseData {
  errorType?: ErrorType;
  message?: string;
  data?: GraphData;
}

export interface GraphSettings {
  displayName?: DisplayName;
  yearRange?: [start_year: string | undefined, end_year: string | undefined];
  size?: GraphSize;
  theme?: Themes;
}

export interface GitHubApiJson<Data> {
  data?: Data;
  message?: string;
  errors?: { type: string; message: string }[];
}
