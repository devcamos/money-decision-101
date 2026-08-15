# Nexus Material Architecture v1

Status: CONCEPTUAL / RECOMMENDED
Version: 1.0.0
Scope: Design review across Nexus systems, products and components

Nexus Material Architecture is a vocabulary for desired structural properties. It is not a literal material classification and does not override Nexus Gold normative engineering controls.

## The five properties

### 1. Sharpness / Obsidian

Question: **Does this remove noise and produce useful clarity?**

Use for:
- user journeys;
- decision outputs;
- information hierarchy;
- product scope.

Healthy expression:
- one clear question or action at a time;
- unnecessary complexity removed;
- outputs compressed into understandable next steps.

Failure mode:
- sharp but brittle: oversimplification, false certainty or UX that hides nuance.

### 2. Evidence / Tourmaline

Question: **Can we see the conditions and evidence that produced this result?**

Use for:
- provenance;
- domain claims;
- policy decisions;
- audits;
- architecture decisions.

Healthy expression:
- sources and versions are traceable;
- interpretations are separated from authority statements;
- decisions can explain which facts and rules mattered.

Failure mode:
- decorative citation without actual dependency or traceability.

### 3. Flow / Graphite

Question: **Can information, responsibility and change move through the system without unnecessary friction?**

Use for:
- service boundaries;
- interfaces;
- team ownership;
- data flow;
- replaceability.

Healthy expression:
- strong contracts with adaptable implementations;
- information reaches the right layer;
- components can evolve without centralising every decision.

Failure mode:
- flexibility without cohesion, or excessive abstraction that makes ownership unclear.

### 4. Boundary / Diamond

Question: **What must not casually bend?**

Use for:
- compliance constraints;
- security controls;
- data boundaries;
- policy invariants;
- release gates.

Healthy expression:
- critical constraints are explicit and executable where feasible;
- bypasses are difficult and visible;
- unsafe uncertainty fails closed.

Failure mode:
- excessive rigidity applied to areas where learning and iteration are required.

### 5. Composition / Composite

Question: **Are the other properties arranged correctly for the job?**

A Nexus product is normally strongest as a composite rather than maximising one property everywhere.

Example:

`UX -> Obsidian`
`Evidence/provenance -> Tourmaline`
`Application/service architecture -> Graphite`
`Policy/security/compliance -> Diamond`
`Whole product -> Composite`

## Application across levels

The properties can be used at any level:

- Enterprise / Nexus: composition and coherent flow.
- System: flow with explicit hard boundaries.
- Product: deliberate combination of clarity, evidence, flow and controls.
- Component: whichever property best matches its responsibility.
- Rule/control: generally high boundary strength and traceability.

Do not assume every system is Graphite or every rule is Diamond. The material language describes the quality required for a particular responsibility.

## Money Decision 101 reference review

### Sharpness
Six-question journey, one primary result and clear next educational area.

### Evidence
Result exposes policy ID, policy version and official supporting evidence.

### Flow
Browser, Next.js boundary, validation, OPA policy engine and UI copy remain distinct responsibilities.

### Boundary
OPA policy, evidence status, fail-closed behaviour, compliance tests and CI release gates constrain unsafe behaviour.

### Composition
The user receives a simple experience while the internal governance remains substantially stronger than the visible UI complexity.

## Review prompts

For a significant Nexus design or architecture review ask:

1. What should be sharper?
2. What needs evidence or provenance?
3. Where must information or change flow more easily?
4. What boundary must not bend?
5. Is the composition appropriate to the actual stress this system will face?

## Relationship to Nexus Gold

**Nexus Gold** answers: *How well must we engineer and govern this?*

**Material Architecture** answers: *What structural properties should this exhibit?*

Gold is normative. Material Architecture is a thinking and review tool. A metaphor must not become a mandatory implementation rule unless translated into a concrete engineering requirement with evidence that it materially improves the system.
