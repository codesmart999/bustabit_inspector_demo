type ActionGenerator<Name extends string, Payload = never> = {
  type: Name;
  payload: Payload;
};

type GameEndedAction = ActionGenerator<"GameEnded", { gameId: string; crashValue: string; balance: number; }>;
type DefaultAction = ActionGenerator<"Default", {}>;

export type Message = GameEndedAction | DefaultAction;

export type LogType = "info" | "warning" | "error" | "default";