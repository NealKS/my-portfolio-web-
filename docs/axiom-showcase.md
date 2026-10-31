# Axiom featured project

Repository inspected: https://github.com/NealKS/axiom2
Pinned revision: `374a7ebf9777725c1abd13ffba6e9cb914333f94`.

## Accuracy and provenance

Reviewed README.md, docs/ARCHITECTURE.md, docs/DEMO.md, pyproject.toml,
src/axiom/cli.py, access_risk/{loader,engine,scoring,explainer}.py, and aws/template.yaml.
The repository supports Python, S3/Lambda/SNS through SAM, optional Bedrock explanations,
and optional Vyper Guard report correlation. It describes itself as alpha software.
The showcase makes no claim of production deployment, measured production performance,
security certification, or autonomous access revocation.

`src/data/axiomDemo.ts` is a compact, derived summary of the engine output from the two
checked-in synthetic examples. These are synthetic review findings, not actual organizational
exposures or measured security effectiveness. Counts refer to findings, not necessarily unique
identities or permissions. The identity panel displays the three highest heuristic scores.

To reproduce from the pinned checkout, with its dependencies installed:

```sh
axiom access-risk examples/access_risk_demo.json --format json --contract-report examples/access_risk_contract_report.json --output /tmp/axiom-demo-report.json
```

For this implementation the same loader and analysis function were invoked directly in Python:

```python
from axiom.access_risk.loader import load_input
from axiom.access_risk.engine import analyze
report = analyze(load_input('examples/access_risk_demo.json'),
                 contract_reports=['examples/access_risk_contract_report.json'])
```

Result: 24 identities, 21 findings: 4 CRITICAL, 10 HIGH, 1 MEDIUM, 0 LOW, 6 INFO.
Rules: 2 stale_identity, 4 excessive_scope, 8 unused_permission, 5 peer_drift,
1 unusual_activity, 1 cross_layer_exposure.
Top identity scores: user-01 90, user-05 51, user-04 50 (higher indicates more risk).

The interactive signal selectors show one actual finding and its recommendation/evidence types
for each selected rule. They do not run live analysis. The terminal is an illustrative command;
the modal provides the full executable example using the repository's checked-in paths.

## Scope

Axiom replaces only the second featured project. The Algorand card and its project data remain
unchanged. The shared section eyebrow now says Selected Engineering Projects, so it does not
imply Axiom is a production deployment. Its case study uses the existing ProjectModal shell,
with Axiom-only architecture, CLI content, focus trapping, and Escape dismissal.
