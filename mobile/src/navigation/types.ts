import type {NavigatorScreenParams} from '@react-navigation/native';

export type ActivityType = 'task' | 'call' | 'note' | 'meeting';

export type FormMode = 'create' | 'edit';

export type Priority = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type CallOutcome =
  | 'connected'
  | 'voicemail'
  | 'no_answer'
  | 'left_message';

export type DashboardStackParamList = {
  Dashboard: undefined;
  NotificationList: undefined;
};

export type ClientsStackParamList = {
  ClientList: undefined;
  ClientDetail: {clientId: string};
  ClientForm: {mode: 'create'} | {mode: 'edit'; clientId: string};
};

export type DealsStackParamList = {
  DealPipeline: undefined;
  DealDetail: {dealId: string};
  DealForm:
    | {mode: 'create'; clientId?: string}
    | {mode: 'edit'; dealId: string};
};

export type ActivitiesStackParamList = {
  ActivityList: {filter?: ActivityType};
  TaskBoard: undefined;
  TaskDetail: {taskId: string};
  TaskForm:
    | {mode: 'create'; clientId?: string; dealId?: string}
    | {mode: 'edit'; taskId: string};
  CallLogForm: {clientId?: string; dealId?: string};
  NoteForm:
    | {mode: 'create'; clientId?: string; dealId?: string}
    | {mode: 'edit'; noteId: string};
  MeetingForm:
    | {mode: 'create'; clientId?: string; dealId?: string}
    | {mode: 'edit'; meetingId: string};
  Calendar: undefined;
};

export type MoreStackParamList = {
  MoreMenu: undefined;
  ReportsHub: undefined;
  PipelineReport: undefined;
  ActivityReport: undefined;
  ClientReport: undefined;
  Settings: undefined;
  Profile: undefined;
  SyncStatus: undefined;
  About: undefined;
};

export type RootTabParamList = {
  DashboardTab: NavigatorScreenParams<DashboardStackParamList>;
  ClientsTab: NavigatorScreenParams<ClientsStackParamList>;
  DealsTab: NavigatorScreenParams<DealsStackParamList>;
  ActivitiesTab: NavigatorScreenParams<ActivitiesStackParamList>;
  MoreTab: NavigatorScreenParams<MoreStackParamList>;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  GlobalSearch: undefined;
  QuickAction: undefined;
};
