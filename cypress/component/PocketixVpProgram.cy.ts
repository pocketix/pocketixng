import { PocketixVpModule, PocketixVpProgramComponent } from "pocketixng";
import { createOutputSpy } from "@cypress/angular";

import language from "../../../pocketix-vpl-shared-tests/fixtures/language.json";
import siblings from "../../../pocketix-vpl-shared-tests/fixtures/programs/siblings.json";
import duplicateParams from "../../../pocketix-vpl-shared-tests/fixtures/programs/duplicateParams.json";
import empty from "../../../pocketix-vpl-shared-tests/fixtures/programs/empty.json";

// Shared, framework-agnostic assertions — see pocketix-vpl-shared-tests/README.md
import * as selectorsModule from "../../../pocketix-vpl-shared-tests/scenarios/selectors";
import * as scenarios from "../../../pocketix-vpl-shared-tests/scenarios/sharedScenarios";

const common = selectorsModule.common;
const perRepo = selectorsModule.perRepo;
// This repo's full selector set: shared base + Angular-specific cosmetic classes.
const sel = Object.assign({}, common, perRepo.angular);

function mountEditor(program) {
  cy.mount(PocketixVpProgramComponent, {
    imports: [PocketixVpModule],
    componentProperties: {
      program: program,
      language: language,
    },
  });
}

describe("PocketixVpProgramComponent (shared cross-repo scenarios)", () => {
  it("renders sibling statements in order", () => {
    mountEditor(siblings);
    scenarios.rendersStatementTitles(sel, ["Set Value", "Set Value"]);
  });

  it("reorders siblings via the move-down button", () => {
    mountEditor(siblings);
    scenarios.reordersSiblingsViaMoveButtons(sel);
  });

  it("removes a statement via the remove button", () => {
    mountEditor(siblings);
    scenarios.removesFirstStatement(sel);
  });

  it("toggles the accordion body open/closed on header click", () => {
    mountEditor(siblings);
    scenarios.togglesAccordionBody(sel);
  });

  it("renders duplicate-valued params as separate rows", () => {
    mountEditor(duplicateParams);
    scenarios.rendersDuplicateValuedParamsAsSeparateRows(sel);
  });

  it("renders the root add-statement button without crashing", () => {
    mountEditor(empty);
    scenarios.rootAddButtonRendersWithoutCrashing(sel);
  });
});

// Regression test for "PocketixVpProgramComponent has zero @Output()s" (see
// main report: the host app had no way to be notified of program changes at
// all - AppComponent.onProgramChange() never fired from actual editing, only
// when loading a program via the More panel).
describe("PocketixVpProgramComponent onProgramChange output", () => {
  it("emits the updated program when a statement is removed", () => {
    // PocketixVpBlockComponent mutates its @Input() block in place (see main
    // report), and earlier tests in this file mount the shared `siblings`
    // import directly - by this point it may already carry mutation damage
    // from those tests (e.g. spliced down from 2 elements to 1). Use an
    // independent fixture literal, not a clone of the shared import.
    const isolatedProgram = {
      block: [
        { name: "setValue", params: ["first"] },
        { name: "setValue", params: ["second"] },
      ],
    };

    cy.mount(PocketixVpProgramComponent, {
      imports: [PocketixVpModule],
      componentProperties: {
        program: isolatedProgram,
        language: language,
        onProgramChange: createOutputSpy("onProgramChange"),
      },
    });

    cy.get(`${sel.block} ${sel.accordion}`).should("have.length", 2);

    cy.get(`${sel.block} ${sel.accordion}`).first().find(sel.removeButton).click({ force: true });

    cy.get("@onProgramChange").should("have.been.calledOnce");
    cy.get("@onProgramChange").should((stub) => {
      const emitted = stub.getCall(0).args[0];
      expect(emitted.block).to.have.length(1);
    });
  });
});
