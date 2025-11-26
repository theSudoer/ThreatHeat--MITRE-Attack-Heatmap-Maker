import { MatrixColumn, TacticEnum } from './types';

// A subset of the MITRE Enterprise Matrix to serve as the "background" skeleton.
// We populate this so the heatmap looks like a full matrix even before the specific actor data highlights cells.
export const BASE_MATRIX: MatrixColumn[] = [
  {
    tacticName: TacticEnum.Reconnaissance,
    tacticId: 'TA0043',
    techniques: [
      { id: 'T1595', name: 'Active Scanning', tactic: TacticEnum.Reconnaissance },
      { id: 'T1592', name: 'Gather Victim Host Info', tactic: TacticEnum.Reconnaissance },
      { id: 'T1589', name: 'Gather Victim Identity Info', tactic: TacticEnum.Reconnaissance },
      { id: 'T1590', name: 'Gather Victim Network Info', tactic: TacticEnum.Reconnaissance },
      { id: 'T1598', name: 'Phishing for Info', tactic: TacticEnum.Reconnaissance },
      { id: 'T1593', name: 'Search Open Websites', tactic: TacticEnum.Reconnaissance },
      { id: 'T1596', name: 'Search Open Technical Databases', tactic: TacticEnum.Reconnaissance },
    ]
  },
  {
    tacticName: TacticEnum.ResourceDevelopment,
    tacticId: 'TA0042',
    techniques: [
      { id: 'T1583', name: 'Acquire Infrastructure', tactic: TacticEnum.ResourceDevelopment },
      { id: 'T1586', name: 'Compromise Accounts', tactic: TacticEnum.ResourceDevelopment },
      { id: 'T1584', name: 'Compromise Infrastructure', tactic: TacticEnum.ResourceDevelopment },
      { id: 'T1587', name: 'Develop Capabilities', tactic: TacticEnum.ResourceDevelopment },
      { id: 'T1588', name: 'Obtain Capabilities', tactic: TacticEnum.ResourceDevelopment },
      { id: 'T1608', name: 'Stage Capabilities', tactic: TacticEnum.ResourceDevelopment },
    ]
  },
  {
    tacticName: TacticEnum.InitialAccess,
    tacticId: 'TA0001',
    techniques: [
      { id: 'T1189', name: 'Drive-by Compromise', tactic: TacticEnum.InitialAccess },
      { id: 'T1190', name: 'Exploit Public-Facing App', tactic: TacticEnum.InitialAccess },
      { id: 'T1133', name: 'External Remote Services', tactic: TacticEnum.InitialAccess },
      { id: 'T1200', name: 'Hardware Additions', tactic: TacticEnum.InitialAccess },
      { id: 'T1566', name: 'Phishing', tactic: TacticEnum.InitialAccess },
      { id: 'T1091', name: 'Replication Through Removable Media', tactic: TacticEnum.InitialAccess },
      { id: 'T1195', name: 'Supply Chain Compromise', tactic: TacticEnum.InitialAccess },
      { id: 'T1199', name: 'Trusted Relationship', tactic: TacticEnum.InitialAccess },
      { id: 'T1078', name: 'Valid Accounts', tactic: TacticEnum.InitialAccess },
    ]
  },
  {
    tacticName: TacticEnum.Execution,
    tacticId: 'TA0002',
    techniques: [
      { id: 'T1059', name: 'Command and Scripting Interpreter', tactic: TacticEnum.Execution },
      { id: 'T1203', name: 'Exploitation for Client Execution', tactic: TacticEnum.Execution },
      { id: 'T1106', name: 'Native API', tactic: TacticEnum.Execution },
      { id: 'T1053', name: 'Scheduled Task/Job', tactic: TacticEnum.Execution },
      { id: 'T1204', name: 'User Execution', tactic: TacticEnum.Execution },
      { id: 'T1047', name: 'Windows Management Instrumentation', tactic: TacticEnum.Execution },
    ]
  },
  {
    tacticName: TacticEnum.Persistence,
    tacticId: 'TA0003',
    techniques: [
      { id: 'T1098', name: 'Account Manipulation', tactic: TacticEnum.Persistence },
      { id: 'T1136', name: 'Create Account', tactic: TacticEnum.Persistence },
      { id: 'T1543', name: 'Create or Modify System Process', tactic: TacticEnum.Persistence },
      { id: 'T1546', name: 'Event Triggered Execution', tactic: TacticEnum.Persistence },
      { id: 'T1133', name: 'External Remote Services', tactic: TacticEnum.Persistence },
      { id: 'T1574', name: 'Hijack Execution Flow', tactic: TacticEnum.Persistence },
      { id: 'T1053', name: 'Scheduled Task/Job', tactic: TacticEnum.Persistence },
      { id: 'T1078', name: 'Valid Accounts', tactic: TacticEnum.Persistence },
    ]
  },
  {
    tacticName: TacticEnum.PrivilegeEscalation,
    tacticId: 'TA0004',
    techniques: [
      { id: 'T1548', name: 'Abuse Elevation Control Mechanism', tactic: TacticEnum.PrivilegeEscalation },
      { id: 'T1134', name: 'Access Token Manipulation', tactic: TacticEnum.PrivilegeEscalation },
      { id: 'T1068', name: 'Exploitation for Privilege Escalation', tactic: TacticEnum.PrivilegeEscalation },
      { id: 'T1055', name: 'Process Injection', tactic: TacticEnum.PrivilegeEscalation },
      { id: 'T1078', name: 'Valid Accounts', tactic: TacticEnum.PrivilegeEscalation },
    ]
  },
  {
    tacticName: TacticEnum.DefenseEvasion,
    tacticId: 'TA0005',
    techniques: [
      { id: 'T1140', name: 'Deobfuscate/Decode Files or Information', tactic: TacticEnum.DefenseEvasion },
      { id: 'T1070', name: 'Indicator Removal on Host', tactic: TacticEnum.DefenseEvasion },
      { id: 'T1036', name: 'Masquerading', tactic: TacticEnum.DefenseEvasion },
      { id: 'T1027', name: 'Obfuscated Files or Information', tactic: TacticEnum.DefenseEvasion },
      { id: 'T1055', name: 'Process Injection', tactic: TacticEnum.DefenseEvasion },
      { id: 'T1218', name: 'System Binary Proxy Execution', tactic: TacticEnum.DefenseEvasion },
      { id: 'T1497', name: 'Virtualization/Sandbox Evasion', tactic: TacticEnum.DefenseEvasion },
    ]
  },
  {
    tacticName: TacticEnum.CredentialAccess,
    tacticId: 'TA0006',
    techniques: [
      { id: 'T1110', name: 'Brute Force', tactic: TacticEnum.CredentialAccess },
      { id: 'T1555', name: 'Credentials from Password Stores', tactic: TacticEnum.CredentialAccess },
      { id: 'T1212', name: 'Exploitation for Credential Access', tactic: TacticEnum.CredentialAccess },
      { id: 'T1187', name: 'Forced Authentication', tactic: TacticEnum.CredentialAccess },
      { id: 'T1003', name: 'OS Credential Dumping', tactic: TacticEnum.CredentialAccess },
      { id: 'T1558', name: 'Steal or Forge Kerberos Tickets', tactic: TacticEnum.CredentialAccess },
      { id: 'T1056', name: 'Input Capture', tactic: TacticEnum.CredentialAccess },
    ]
  },
  {
    tacticName: TacticEnum.Discovery,
    tacticId: 'TA0007',
    techniques: [
      { id: 'T1087', name: 'Account Discovery', tactic: TacticEnum.Discovery },
      { id: 'T1083', name: 'File and Directory Discovery', tactic: TacticEnum.Discovery },
      { id: 'T1046', name: 'Network Service Discovery', tactic: TacticEnum.Discovery },
      { id: 'T1012', name: 'Query Registry', tactic: TacticEnum.Discovery },
      { id: 'T1018', name: 'Remote System Discovery', tactic: TacticEnum.Discovery },
      { id: 'T1082', name: 'System Information Discovery', tactic: TacticEnum.Discovery },
      { id: 'T1016', name: 'System Network Configuration Discovery', tactic: TacticEnum.Discovery },
      { id: 'T1033', name: 'System Owner/User Discovery', tactic: TacticEnum.Discovery },
    ]
  },
  {
    tacticName: TacticEnum.LateralMovement,
    tacticId: 'TA0008',
    techniques: [
      { id: 'T1210', name: 'Exploitation of Remote Services', tactic: TacticEnum.LateralMovement },
      { id: 'T1570', name: 'Lateral Tool Transfer', tactic: TacticEnum.LateralMovement },
      { id: 'T1021', name: 'Remote Services', tactic: TacticEnum.LateralMovement },
      { id: 'T1091', name: 'Replication Through Removable Media', tactic: TacticEnum.LateralMovement },
      { id: 'T1072', name: 'Software Deployment Tools', tactic: TacticEnum.LateralMovement },
      { id: 'T1550', name: 'Use Alternate Authentication Material', tactic: TacticEnum.LateralMovement },
    ]
  },
  {
    tacticName: TacticEnum.Collection,
    tacticId: 'TA0009',
    techniques: [
      { id: 'T1560', name: 'Archive Collected Data', tactic: TacticEnum.Collection },
      { id: 'T1123', name: 'Audio Capture', tactic: TacticEnum.Collection },
      { id: 'T1119', name: 'Automated Collection', tactic: TacticEnum.Collection },
      { id: 'T1115', name: 'Clipboard Data', tactic: TacticEnum.Collection },
      { id: 'T1005', name: 'Data from Local System', tactic: TacticEnum.Collection },
      { id: 'T1039', name: 'Data from Network Shared Drive', tactic: TacticEnum.Collection },
      { id: 'T1074', name: 'Data Staged', tactic: TacticEnum.Collection },
      { id: 'T1114', name: 'Email Collection', tactic: TacticEnum.Collection },
      { id: 'T1056', name: 'Input Capture', tactic: TacticEnum.Collection },
      { id: 'T1113', name: 'Screen Capture', tactic: TacticEnum.Collection },
      { id: 'T1125', name: 'Video Capture', tactic: TacticEnum.Collection },
    ]
  },
  {
    tacticName: TacticEnum.CommandAndControl,
    tacticId: 'TA0011',
    techniques: [
      { id: 'T1071', name: 'Application Layer Protocol', tactic: TacticEnum.CommandAndControl },
      { id: 'T1095', name: 'Non-Application Layer Protocol', tactic: TacticEnum.CommandAndControl },
      { id: 'T1132', name: 'Data Encoding', tactic: TacticEnum.CommandAndControl },
      { id: 'T1001', name: 'Data Obfuscation', tactic: TacticEnum.CommandAndControl },
      { id: 'T1568', name: 'Dynamic Resolution', tactic: TacticEnum.CommandAndControl },
      { id: 'T1573', name: 'Encrypted Channel', tactic: TacticEnum.CommandAndControl },
      { id: 'T1105', name: 'Ingress Tool Transfer', tactic: TacticEnum.CommandAndControl },
      { id: 'T1090', name: 'Proxy', tactic: TacticEnum.CommandAndControl },
      { id: 'T1219', name: 'Remote Access Software', tactic: TacticEnum.CommandAndControl },
    ]
  },
  {
    tacticName: TacticEnum.Exfiltration,
    tacticId: 'TA0010',
    techniques: [
      { id: 'T1020', name: 'Automated Exfiltration', tactic: TacticEnum.Exfiltration },
      { id: 'T1030', name: 'Data Transfer Size Limits', tactic: TacticEnum.Exfiltration },
      { id: 'T1048', name: 'Exfiltration Over Alternative Protocol', tactic: TacticEnum.Exfiltration },
      { id: 'T1041', name: 'Exfiltration Over C2 Channel', tactic: TacticEnum.Exfiltration },
      { id: 'T1011', name: 'Exfiltration Over Other Network Medium', tactic: TacticEnum.Exfiltration },
      { id: 'T1052', name: 'Exfiltration Over Physical Medium', tactic: TacticEnum.Exfiltration },
      { id: 'T1029', name: 'Scheduled Transfer', tactic: TacticEnum.Exfiltration },
    ]
  },
  {
    tacticName: TacticEnum.Impact,
    tacticId: 'TA0040',
    techniques: [
      { id: 'T1531', name: 'Account Access Removal', tactic: TacticEnum.Impact },
      { id: 'T1485', name: 'Data Destruction', tactic: TacticEnum.Impact },
      { id: 'T1486', name: 'Data Encrypted for Impact', tactic: TacticEnum.Impact },
      { id: 'T1490', name: 'Inhibit System Recovery', tactic: TacticEnum.Impact },
      { id: 'T1491', name: 'Defacement', tactic: TacticEnum.Impact },
      { id: 'T1498', name: 'Network Denial of Service', tactic: TacticEnum.Impact },
      { id: 'T1499', name: 'Endpoint Denial of Service', tactic: TacticEnum.Impact },
      { id: 'T1496', name: 'Resource Hijacking', tactic: TacticEnum.Impact },
    ]
  }
];