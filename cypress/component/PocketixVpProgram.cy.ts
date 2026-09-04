import { Component } from "@angular/core";
import { PocketixVpModule, PocketixVpProgramComponent, PocketixVpExpressionComponent } from "pocketixng";
import { createOutputSpy } from "@cypress/angular";

import language from "../../../pocketix-vpl-shared-tests/fixtures/language.json";
import languageMissingRoot from "../../../pocketix-vpl-shared-tests/fixtures/language-missing-root.json";
import siblings from "../../../pocketix-vpl-shared-tests/fixtures/programs/siblings.json";
import duplicateParams from "../../../pocketix-vpl-shared-tests/fixtures/programs/duplicateParams.json";
import structureParams from "../../../pocketix-vpl-shared-tests/fixtures/programs/structureParams.json";
import empty from "../../../pocketix-vpl-shared-tests/fixtures/programs/empty.json";

// Shared, framework-agnostic assertions — see pocketix-vpl-shared-tests/README.md
import * as selectorsModule from "../../../pocketix-vpl-shared-tests/scenarios/selectors";
import * as scenarios from "../../../pocketix-vpl-shared-tests/scenarios/sharedScenarios";

const common = selectorsModule.common;
const perRepo = selectorsModule.perRepo;
// This repo's full selector set: shared base + Angular-specific cosmetic classes.
const sel = Object.assign({}, common, perRepo.angular);

function mountEditor(program, lang = language) {
  cy.mount(PocketixVpProgramComponent, {
    imports: [PocketixVpModule],
    componentProperties: {
      program: program,
      language: lang,
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

  it("renders bound values for structure-type command params", () => {
    mountEditor(structureParams);
    scenarios.rendersBoundStructureParamValues(sel);
  });

  it("renders the root add-statement button without crashing", () => {
    mountEditor(empty);
    scenarios.rootAddButtonRendersWithoutCrashing(sel);
  });

  // Regression test for the "_" root-statement crash bug (see main report:
  // pocketix-vp-block.component.html's root "+" button read
  // language.statements[parent.name] with no `?.` guard, unlike every other
  // lookup in the same template).
  it("does not crash when the language has no '_' root entry", () => {
    mountEditor(empty, languageMissingRoot);
    scenarios.rootAddButtonRendersWithoutCrashing(sel);
  });
});

// Regression test for "PocketixVpProgramComponent has zero @Output()s" (see
// main report: the host app had no way to be notified of program changes at
// all - AppComponent.onProgramChange() never fired from actual editing, only
// when loading a program via the More panel).
const fullSettings = (manualSync) => ({
  menu: {
    enabled: true,
    enableToggleVisual: true,
    enableSaveVisual: true,
    enableUndo: true,
    enableRedo: true,
    enableSync: true,
    enableSaveText: true,
    enableToggleText: true,
    enableLang: true,
  },
  visualEditor: { enabled: true },
  textEditor: { enabled: true, style: {} },
  common: { manualSync },
});

// Regression test for "Save Text->Visual can wipe the entire program" (see
// main report: actBlock had no initializer and was only ever assigned inside
// the 1000ms-debounced input handler - clicking "Save Text" without typing
// first, or within the debounce window, set program.block to undefined).
describe("PocketixVpTextEditorComponent actBlock initialization", () => {
  it("does not wipe the program when Save Text is clicked without typing first", () => {
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
        settings: fullSettings(true),
        onProgramChange: createOutputSpy("onProgramChange"),
      },
    });

    cy.get(".text-editor").should("exist");

    // "Save Text" -> updateVisualEditor(), the menu-right save button.
    cy.get(".menu-right button").first().click({ force: true });

    cy.get("@onProgramChange").should("have.been.calledOnce");
    cy.get("@onProgramChange").should((stub) => {
      const emitted = stub.getCall(0).args[0];
      expect(emitted.block).to.deep.equal(isolatedProgram.block);
    });
  });
});

// Regression test for "undo()/redo() crash on an empty stack" (see main
// report: .pop() on an empty array returns undefined, and JSON.parse(undefined)
// throws - the only guard was the button's `disabled` attribute, which
// doesn't stop programmatic invocation, e.g. a host holding a @ViewChild
// reference or a future keyboard shortcut).
describe("PocketixVpProgramComponent undo/redo empty-stack guard", () => {
  it("does not throw when undo() is called with an empty undo stack", () => {
    cy.mount(PocketixVpProgramComponent, {
      imports: [PocketixVpModule],
      componentProperties: {
        program: siblings,
        language: language,
      },
    }).then(({ component }) => {
      expect(component.undoList).to.have.length(0);
      expect(() => component.undo()).to.not.throw();
    });
  });

  it("does not throw when redo() is called with an empty redo stack", () => {
    cy.mount(PocketixVpProgramComponent, {
      imports: [PocketixVpModule],
      componentProperties: {
        program: siblings,
        language: language,
      },
    }).then(({ component }) => {
      expect(component.redoList).to.have.length(0);
      expect(() => component.redo()).to.not.throw();
    });
  });
});

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

// Regression test for "undo/redo/text-sync force full tree rebuild" (see
// main report: pocketix-vp-block.component.html's *ngFor had no trackBy, so
// Angular's default identity-based tracking tore down and recreated every
// statement's whole component subtree whenever the block array was replaced
// wholesale - which undo()/redo() always do, via JSON.parse(JSON.stringify(...))
// round-trips that produce content-identical but reference-different arrays.
// A torn-down/recreated instance loses its own local state (e.g. the
// accordion's open/closed toggle), even though nothing about that statement
// actually changed.
describe("PocketixVpBlockComponent trackBy across full-array replacements", () => {
  it("keeps a closed accordion closed after undo() replaces the block array", () => {
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
      },
    }).then(({ component, fixture }) => {
      cy.get(sel.accordionHeader).first().click();
      cy.get(sel.accordionBody).first().should("have.class", "closed");

      cy.then(() => {
        // Mirrors what undo() actually pops off the stack: a fresh
        // JSON.parse of the current program, same content, new object
        // identity throughout - no real edit happened.
        component.undoList = [JSON.stringify(component.program)];
        component.undo();
        fixture.detectChanges();
      });

      cy.get(sel.accordionBody).first().should("have.class", "closed");
    });
  });
});

// Regression test for "PocketixVpBlockComponent mutates its @Input() block
// in place" (see main report: up()/down()/delete()/add() all called
// splice()/push()/element-swap directly on the exact array instance passed
// in as `[block]`, corrupting whatever object the caller happened to hand
// over - e.g. a shared fixture reused across tests, or any other caller
// holding onto that same array reference).
describe("PocketixVpBlockComponent does not mutate its @Input() block array", () => {
  it("leaves the original block array instance untouched when removing a statement", () => {
    const originalBlock = [
      { name: "setValue", params: ["first"] },
      { name: "setValue", params: ["second"] },
    ];
    const isolatedProgram = { block: originalBlock };

    cy.mount(PocketixVpProgramComponent, {
      imports: [PocketixVpModule],
      componentProperties: {
        program: isolatedProgram,
        language: language,
      },
    });

    cy.get(`${sel.block} ${sel.accordion}`).should("have.length", 2);
    cy.get(`${sel.block} ${sel.accordion}`).first().find(sel.removeButton).click({ force: true });
    cy.get(`${sel.block} ${sel.accordion}`).should("have.length", 1);

    cy.then(() => {
      expect(originalBlock, "the original array instance must not be spliced in place").to.have.length(2);
    });
  });
});

// Regression test for "checkExpression() is a no-op" (see main report:
// PocketixVpExpressionComponent.checkExpression() had a `// TODO evaluate
// syntax of expression` stub that unconditionally cleared the error flag,
// so the already-wired disabled-button/error-styling never actually fired
// for any input, however malformed).
describe("PocketixVpExpressionComponent syntax validation", () => {
  it("flags a malformed expression and disables the OK button", () => {
    cy.mount(PocketixVpExpressionComponent, {
      imports: [PocketixVpModule],
      componentProperties: {
        language: language,
        value: "",
      },
    });

    cy.get(".pi-ellipsis-h").click({ force: true });
    cy.get(".text-area").clear().type("5451.Relay1 ==", { delay: 0 });

    cy.get(".text-area").should("have.class", "error");
    cy.contains("button", "OK").should("be.disabled");
  });

  it("does not flag a well-formed expression", () => {
    cy.mount(PocketixVpExpressionComponent, {
      imports: [PocketixVpModule],
      componentProperties: {
        language: language,
        value: "",
      },
    });

    cy.get(".pi-ellipsis-h").click({ force: true });
    cy.get(".text-area").clear().type("5451.Relay1 == 1", { delay: 0 });

    cy.get(".text-area").should("not.have.class", "error");
    cy.contains("button", "OK").should("not.be.disabled");
  });
});

// Regression test for "PocketixVpModule missing exports for text-editor
// component/pipe" (see main report: PocketixVpTextEditorComponent,
// PocketixVpTestposPipe, and PocketixVpTostringPipe were all declared in
// the module but not exported, so a host application importing
// PocketixVpModule could use them internally through
// PocketixVpProgramComponent but couldn't reference any of them directly
// in its own templates - Angular would reject the tag/pipe as unknown).
// Written as a plain decorator-factory call (not `@Component(...) class ...`)
// since this spec file isn't part of the Angular AOT compilation unit and
// the Cypress webpack bundler doesn't apply the TS decorator transform to
// it - Component() is a documented dual API (usable as a direct function
// call), so this is equivalent to the decorator form.
class TextEditorHostHarnessBase {
  program = { block: [{ name: "setValue", params: ["hello"] }] };
  settings = { common: { manualSync: true } };
}
const TextEditorHostHarness = Component({
  selector: "text-editor-host-harness",
  template: `<pocketix-vp-text-editor [program]="program" [settings]="settings"></pocketix-vp-text-editor>`,
})(TextEditorHostHarnessBase);

describe("PocketixVpModule exports", () => {
  it("exports PocketixVpTextEditorComponent for direct use in a host template", () => {
    cy.mount(TextEditorHostHarness, {
      imports: [PocketixVpModule],
    });

    cy.get(".text-area").should("exist");
  });
});
