# Security Policy

## Supported Versions

We actively support the following versions of React DatePicker Lite with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of React DatePicker Lite seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **ankit.roy.0602@gmail.com**

Please include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### What to Expect

You can expect to receive:

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 5 business days
- **Regular Updates**: We will keep you informed of our progress throughout the investigation
- **Resolution Timeline**: We aim to resolve critical vulnerabilities within 30 days

### Security Update Process

1. **Investigation**: We investigate and verify the reported vulnerability
2. **Fix Development**: We develop and test a fix for the vulnerability
3. **Coordinated Disclosure**: We coordinate with the reporter on disclosure timing
4. **Release**: We release a security update and publish a security advisory
5. **Public Disclosure**: We publicly disclose the vulnerability details after users have had time to update

## Security Best Practices

When using React DatePicker Lite in your applications, we recommend:

### Input Validation

- Always validate and sanitize date inputs on the server side
- Use proper date parsing and validation libraries
- Implement appropriate input length limits

### Content Security Policy (CSP)

- Implement a strict Content Security Policy
- Avoid inline styles and scripts when possible
- Use nonce or hash-based CSP directives

### Dependencies

- Keep React DatePicker Lite updated to the latest version
- Regularly audit your dependencies for known vulnerabilities
- Use tools like `npm audit` or `yarn audit`

### Data Handling

- Never trust client-side date validation alone
- Sanitize date inputs before storing in databases
- Use parameterized queries to prevent injection attacks

## Known Security Considerations

### Client-Side Validation

React DatePicker Lite performs client-side validation for user experience, but this should never be relied upon for security. Always implement server-side validation.

### XSS Prevention

The component properly escapes user inputs to prevent XSS attacks, but developers should:

- Sanitize any custom formatting functions
- Validate custom locale data
- Be cautious with custom render functions

### Accessibility and Security

While we prioritize accessibility, be aware that:

- Screen reader announcements may expose date information
- Keyboard navigation patterns should be considered in security contexts
- ARIA labels and descriptions may contain sensitive information

## Vulnerability Disclosure Policy

We believe in responsible disclosure and will work with security researchers to:

- Acknowledge their contribution to improving our security
- Provide credit in our security advisories (unless anonymity is requested)
- Work together on appropriate disclosure timelines
- Ensure fixes are thoroughly tested before release

## Security Contact

For security-related questions or concerns:

- **Email**: ankit.roy.0602@gmail.com
- **Subject Line**: [SECURITY] React DatePicker Lite - [Brief Description]

## Bug Bounty

Currently, we do not offer a formal bug bounty program. However, we greatly appreciate security researchers who help us improve the security of our project and will acknowledge their contributions.

## Security Advisories

Security advisories will be published on:

- GitHub Security Advisories
- npm security advisories
- Project README and documentation

## Compliance

React DatePicker Lite is designed to help developers build applications that comply with:

- OWASP security guidelines
- Common web security standards
- Accessibility standards (WCAG 2.1)

However, compliance ultimately depends on how the component is implemented and used within your application.

---

Thank you for helping keep React DatePicker Lite and our users safe!
