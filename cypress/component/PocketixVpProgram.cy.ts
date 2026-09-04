import { PocketixVpModule, PocketixVpProgramComponent } from "pocketixng";

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
