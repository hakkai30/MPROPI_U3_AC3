# WCAG Accessibility Checklist for HTML Forms

A concise, developer-friendly guide to making HTML forms accessible and compliant with WCAG (Web Content Accessibility Guidelines) standards.

## 1. Labeling & Identification
- [ ] **Explicit Labels:** Every `<input>`, `<textarea>`, and `<select>` must have an associated `<label>`. Link them using the `for` attribute on the label matching the `id` of the input.
- [ ] **Hidden Labels:** If a design absolutely forbids a visible label (e.g., search bars), use `aria-label` or `aria-labelledby` so screen readers can identify the field.
- [ ] **Placeholder is NOT a Label:** Do not rely on the `placeholder` attribute as a substitute for a label. Placeholders disappear when text is entered and often have poor contrast.
- [ ] **Group Related Inputs:** Use `<fieldset>` and `<legend>` to group and describe related form controls, such as a set of radio buttons or checkboxes.

## 2. Validation & Error Handling
- [ ] **Clear Error Messages:** Error messages must be descriptive (e.g., "Please enter a valid email address with an @ symbol" instead of just "Invalid").
- [ ] **Programmatic Error Links:** Use `aria-describedby` on the input element to programmatically link it to the container holding the error message.
- [ ] **Mark Invalid Fields:** Dynamically apply `aria-invalid="true"` to fields that fail validation.
- [ ] **Clear Requirements:** Clearly mark required fields visually (e.g., with an asterisk or text) and programmatically (using the `required` or `aria-required="true"` attribute).
- [ ] **Color Independence:** Do not rely *solely* on color (like a red border) to indicate an error state. Include text or icons.

## 3. Keyboard Navigation & Focus
- [ ] **Logical Tab Order:** Ensure the `Tab` key moves focus logically through the form. The natural DOM order usually handles this; avoid using `tabindex` greater than `0`.
- [ ] **Visible Focus:** Ensure a highly visible focus indicator (like an outline) is present for users navigating via keyboard. Do not use `outline: none` without providing a custom `:focus-visible` style.
- [ ] **Custom Components:** If you build custom dropdowns or checkboxes using `<div>` or `<span>`, they must have `tabindex="0"`, correct `role` attributes, and respond to `Enter` and `Space` keys.

## 4. Input Types & Autocomplete
- [ ] **Semantic Input Types:** Use specific HTML5 input types (`type="email"`, `type="tel"`, `type="number"`) to trigger the correct virtual keyboards on mobile devices.
- [ ] **Autocomplete Support:** Use the `autocomplete` attribute to help browsers auto-fill user data (e.g., `autocomplete="email"`, `autocomplete="given-name"`). This specifically helps users with cognitive disabilities.

## 5. Contrast & Visuals
- [ ] **Text Contrast:** Ensure a minimum contrast ratio of 4.5:1 for standard text (labels, placeholders, values).
- [ ] **Component Contrast:** Ensure a minimum contrast ratio of 3:1 for form control borders and states compared to their background.

---

### Example of an Accessible Input

```html
<label for="user-email">Email Address <span aria-hidden="true">*</span></label>
<input 
  type="email" 
  id="user-email" 
  name="email" 
  required 
  aria-required="true"
  autocomplete="email"
  aria-describedby="email-error"
/>
<!-- This error span is only visible when validation fails -->
<span id="email-error" class="error-message" hidden>
  Please provide a valid email address.
</span>
```
