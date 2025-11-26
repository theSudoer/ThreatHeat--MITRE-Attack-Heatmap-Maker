export interface Technique {
  id: string;
  name: string;
  description?: string; // Standard description
  usage?: string; // Specific usage by the actor
  score?: number; // 0-100 likelihood/intensity
  tactic: string;
}

export interface ActorProfile {
  name: string;
  aliases: string[];
  description: string;
  origin: string;
  targets: string[];
  techniques: Technique[];
}

export interface MatrixColumn {
  tacticName: string;
  tacticId: string; // e.g., TA0001
  techniques: Technique[];
}

export enum TacticEnum {
  Reconnaissance = "Reconnaissance",
  ResourceDevelopment = "Resource Development",
  InitialAccess = "Initial Access",
  Execution = "Execution",
  Persistence = "Persistence",
  PrivilegeEscalation = "Privilege Escalation",
  DefenseEvasion = "Defense Evasion",
  CredentialAccess = "Credential Access",
  Discovery = "Discovery",
  LateralMovement = "Lateral Movement",
  Collection = "Collection",
  CommandAndControl = "Command and Control",
  Exfiltration = "Exfiltration",
  Impact = "Impact",
}