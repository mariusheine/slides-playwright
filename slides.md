---
theme: default
class: text-center
css: unocss
---

# Playwright

## E2E Testing Framework

https://github.com/microsoft/playwright

by Marius Heine (GEPROG GmbH)

---

# Agenda

<Toc columns="2" />

---

# Was ist Playwright?

<div grid="~ cols-2 gap-4">
    <div class="flex flex-col gap-4">
        <h2 v-click>Browser-Automatisierung</h2>
        <ul class="space-y-2">
            <li v-click>Cross-browser: Chromium, WebKit, Firefox, ...</li>
            <li v-click>Cross-platform: Windows, Linux, macOS</li>
            <li v-click>Cross-language: TypeScript, JavaScript, Python, .NET und Java</li>
            <li v-click>Native mobile emulation</li>
        </ul>
    </div>
    <div>
        <h2 v-click>Testing framework</h2>
        <ul class="space-y-2">
            <li v-click>Assertions</li>
            <li v-click>Mocking of APIs</li>
            <li v-click>Tracing, Videos, Screenshots</li>
            <li v-click>Parametrisierung, Parallelisierung</li>
            <li v-click>Test-Reports</li>
            <li v-click>E2E-Testing, API-Testing, Component-Testing (experimental)</li>
        </ul>
    </div>
    <h2 v-click class="col-span-2">Ein Hochleistungs-Framework für das automatisierte Testen von modernen Webanwendungen</h2>
    <div v-click>Ähnliche Frameworks: Selenium, Cypress</div>
</div>

---

# Konfiguration

<v-clicks>

1. Playwright installieren
1. `playwright.config.ts` erstellen
    - `baseUrl` z.B. `https://test.traser.business-central.microsoft.com`
    - `projects` z.B.
      ```ts
        {
            projects: [
                {
                    name: 'firefox',
                    use: { ...devices['Desktop Firefox'] },
                },
                {
                    name: 'Microsoft Edge',
                    use: { ...devices['Desktop Edge'], channel: 'msedge' },
                },
            ]
        }
      ```

</v-clicks>
<v-clicks>

https://playwright.dev/docs/test-configuration

Alternativ: Startskripte verwenden z.B. `pnpm create playwright`

</v-clicks>

---

# VS Code extension

<img src="https://github.com/microsoft/playwright/assets/13063165/290f7373-d7ef-4aac-ae38-6c8eae217fba" style="height: 250px" />

https://playwright.dev/docs/getting-started-vscode

---

# Testerstellung

<v-clicks>

1. Testsuite definieren `${name}.spec.ts`
1. Playwright importieren `import { test, expect } from '@playwright/test';`
1. Testcase definieren `test('name of the test case', async ({ page }) => { ... })`
1. Useraktionen und Assertions definieren
   ```ts
   // open specific URL in browser
   await page.goto('https://traser-software.de/');

   // click on menu item "Unternehmen"
   const nav = await page.getByRole('navigation');
   await nav.getByRole('link', { name: 'Unternehmen' }).click();

   // check page content
   await expect(page).toHaveText('TRASER ROCKT.');
   ```

</v-clicks>

<v-clicks>

- Playwright nutz Auto-waiting und Auto-Retrying
- Testcases einer Testsuite laufen sequenziell (außer anders konfiguriert)
- Testsuiten werden parallel ausgeführt

</v-clicks>

---

# Testgenerierung

Playwright besitzt einen interaktiven Testgenerator

`pnpm playwright codegen`

<img src="https://github.com/microsoft/playwright/assets/13063165/34a79ea1-639e-4cb3-8115-bfdc78e3d34d" style="height: 300px" />

https://playwright.dev/docs/codegen-intro

---

# Tests ausführen

`pnpm playwright test`

<div grid="~ cols-2 gap-4">
  <img src="/test-run-result.png" />

  <video controls>
    <source src="/small-video.webm" type="video/mp4">
  </video>
</div>

<!-- ---

# Tests ausführen

`pnpm playwright test`

<div grid="~ cols-1 gap-4">
  <video controls>
    <source src="/big-video.webm" type="video/mp4">
  </video>
</div> -->

---

# Testergebnisse

HTML Reporter nutzen mit

`pnpm playwright test --reporter=html` 

oder in `playwright.config.ts` konfigurieren

<img src="/html-reporter.png" style="height: 250px" />

jederzeit anzeigbar über `pnpm playwright show-report`

---

# Test debuggen - UI mode

`pnpm playwright test --ui`

<img src="/ui-mode.png" style="height: 300px" />

https://playwright.dev/docs/test-ui-mode

---

# Test debuggen - Inspector

`pnpm playwright test --debug`

<img src="https://user-images.githubusercontent.com/13063165/212936618-84b87acc-bc2e-46ed-994b-32b2ef742e60.png" style="height: 220px" />

<v-clicks>

Vorteil: Live editing, direkterer Bezug zum Test-Code, schrittweises Ausführen

Nachteil: Umständlich nur einen Testcase zu debuggen

Alternative: VS Code extension https://playwright.dev/docs/debug

</v-clicks>

---

# Fixtures

<v-clicks>

- Wiederverwandbare Testroutinen
- werden zentral alle definiert
- lädt nur solche, welche tatsächlich in Testcase genutzt werden
- genutzt für seitenspezifische Aktionen

</v-clicks>

<v-clicks>

```ts
import { test as base } from '@playwright/test';
...
export const test = base.extend<MyFixtures>({
  todoPage: async ({ page }, use) => {
    // Set up the fixture.
    const todoPage = new TodoPage(page);
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');
    // Use the fixture value in the test.
    await use(todoPage);
    // Clean up the fixture.
    await todoPage.removeAll();
  },
});
```

https://playwright.dev/docs/test-fixtures

</v-clicks>

---

# Weitere Konzepte

<v-clicks>

- Global setup and teardown (https://playwright.dev/docs/test-global-setup-teardown)
- Authentication (https://playwright.dev/docs/auth)
- Komponenten-Tests (https://playwright.dev/docs/test-components)
- Downloads (https://playwright.dev/docs/downloads)
- Mocking (https://playwright.dev/docs/mock)
- Local dev server (https://playwright.dev/docs/test-webserver)

</v-clicks>

---

# Test Philosophy

<v-clicks>

- für den Benutzer sichtbares Verhalten testen
- Tests so isoliert wie möglich schreiben
- Nur die "eigenen" Dinge testen

</v-clicks>

<v-click>

https://playwright.dev/docs/best-practices#testing-philosophy

</v-click>

---

# Best Practices

<v-clicks>

- Nutzt Locators, die nicht vom DOM abhängig sind
- Nutzt immer Assertions, welche "Auto-waiting" bzw. "Auto-retrying" unterstützen
- Nutzt die Tools von Playwright
- Teste alle relevanten Browser und Devices
- Tests linten
- Tests in der CI-Pipeline laufen lassen
- Nutzt Soft Assertions `expect.soft(...)`, wenn möglich

</v-clicks>

<v-click>

https://playwright.dev/docs/best-practices#best-practices

</v-click>

---

# Herausforderungen

- aussagekräftige Tests
- Größe der Tests
- Flakiness
- Wartung der Tests

---

# CI/CD

<v-clicks>

- Pipeline Job zum Ausführen von `pnpm playwright test`

- evtl. angepasste Konfig über `process.env.CI`

- Microsoft bietet Playwright Testing Service an 
  
  https://azure.microsoft.com/en-us/blog/announcing-microsoft-playwright-testing-scalable-end-to-end-testing-for-modern-web-apps/

- Quickstart for setup

  https://learn.microsoft.com/en-us/azure/playwright-testing/quickstart-run-end-to-end-tests?wt.mc_id=mpt_azblog20231004_blog_cnl&tabs=playwrightcli

</v-clicks>

---

<div class="mt-40 text-center text-[5rem]">Vielen Dank!</div>
