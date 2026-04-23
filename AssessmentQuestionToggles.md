# Assessment Question Toggle Guide

The assessment questions below are currently hidden (not shown to users) but still exist in code.

## Where to turn them back on

Edit the QUESTION_VISIBILITY object in [src/components/HealthCheckTab.tsx](src/components/HealthCheckTab.tsx#L53).

Change any value from false to true to show that question again.

## Hidden Questions and Toggle Keys

- downtime: Estimated unplanned downtime per month (%)
- integrationNeeds: How integrated are your manufacturing systems?
- itOtSegmentation: IT/OT network segmentation status
- incidentRunbooks: Incident response runbooks and exercises
- supplyChainRiskProgram: Supplier / third-party cyber risk management
- encryptionCoverage: Encryption coverage for sensitive data
- phishingExercises: Do you run simulated phishing exercises?
- cybersecurityBudgetPercentage: What percentage of your IT budget is allocated to cybersecurity?
- mfaCoverage: MFA coverage across workforce and privileged accounts
- immutableBackups: Backup strategy and immutability
- formalCybersecurityPolicy: Does your organization have a formal, documented cybersecurity policy?
- breachDetectionConfidence: How confident are you in your team's ability to detect a breach within 24 hours?
- disasterRecoveryPlan: Does your company have a disaster recovery plan?
- cybersecurityIncident: Has your organization experienced a cybersecurity incident in the past 24 months? (ransomware, data breach, phishing attack, etc.)

## Example

Set this in [src/components/HealthCheckTab.tsx](src/components/HealthCheckTab.tsx#L53):

QUESTION_VISIBILITY = {
  downtime: true,
  ...
}

That will bring the downtime question back.
