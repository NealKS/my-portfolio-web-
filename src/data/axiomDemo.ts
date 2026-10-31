// Generated from the upstream synthetic examples using axiom.access_risk.engine.analyze.
// See docs/axiom-showcase.md for provenance and reproduction instructions.
export const AXIOM_DEMO = {
  "commit": "374a7ebf9777725c1abd13ffba6e9cb914333f94",
  "asOf": "2026-10-23T00:00:00Z",
  "total": 21,
  "identityCount": 24,
  "severity": {
    "CRITICAL": 4,
    "HIGH": 10,
    "MEDIUM": 1,
    "INFO": 6
  },
  "identities": [
    {
      "id": "user-01",
      "score": 90
    },
    {
      "id": "user-05",
      "score": 51
    },
    {
      "id": "user-04",
      "score": 50
    }
  ],
  "signals": [
    {
      "rule": "stale_identity",
      "label": "Stale identities",
      "count": 2,
      "title": "Disabled or terminated identity retains active access",
      "identity": "user-01",
      "permission": "p-admin",
      "recommendation": "Confirm ownership, then remove or formally transfer the grant.",
      "evidence": [
        "identity_status",
        "active_grant"
      ]
    },
    {
      "rule": "excessive_scope",
      "label": "Excessive permissions",
      "count": 4,
      "title": "Broad or externally shared permission scope",
      "identity": "user-04",
      "permission": "p-wild",
      "recommendation": "Narrow the resource or sharing scope after confirming application-owner requirements.",
      "evidence": [
        "scope"
      ]
    },
    {
      "rule": "unused_permission",
      "label": "Unused privileges",
      "count": 8,
      "title": "No use observed during the covered review window",
      "identity": "user-01",
      "permission": "p-admin",
      "recommendation": "Confirm with the owner before removing this grant.",
      "evidence": [
        "unused_window"
      ]
    },
    {
      "rule": "peer_drift",
      "label": "Peer drift",
      "count": 5,
      "title": "Permission is an exception needing confirmation",
      "identity": "user-05",
      "permission": "p-contract",
      "recommendation": "Confirm this exception with the manager or app owner; peer difference alone is not evidence of misconduct.",
      "evidence": [
        "peer_comparison"
      ]
    }
  ],
  "correlations": 1
} as const;
