---
name: clean-code
description: >-
  Applies Clean Code guidelines when writing or reviewing code in this Festanova
  invite app. Use when implementing features, refactoring, fixing bugs, or
  reviewing changes, and when the user mentions clean code, SOLID, DRY, or
  maintainability. Keeps edits small and does not rewrite the architecture
  unless a real defect requires it.
---

# Clean Code Guidelines

## Constants Over Magic Numbers
- Replace hard-coded values with named constants
- Use descriptive constant names that explain the value's purpose
- Keep constants at the top of the file or in a dedicated constants file

## Meaningful Names
- Variables, functions, and classes should reveal their purpose
- Names should explain why something exists and how it's used
- Avoid abbreviations unless they're universally understood

## Smart Comments
- Don't comment on what the code does - make the code self-documenting
- Use comments to explain why something is done a certain way
- Document APIs, complex algorithms, and non-obvious side effects

## Single Responsibility
- Each function should do exactly one thing
- Functions should be small and focused
- If a function needs a comment to explain what it does, it should be split

## DRY (Don't Repeat Yourself)
- Extract repeated code into reusable functions
- Share common logic through proper abstraction
- Maintain single sources of truth

## Clean Structure
- Keep related code together
- Organize code in a logical hierarchy
- Use consistent file and folder naming conventions

## Encapsulation
- Hide implementation details
- Expose clear interfaces
- Move nested conditionals into well-named functions

## Code Quality Maintenance
- Refactor continuously
- Fix technical debt early
- Leave code cleaner than you found it

## Testing
- Write tests before fixing bugs
- Keep tests readable and maintainable
- Test edge cases and error conditions

## Version Control
- Write clear commit messages (Conventional Commits)
- Make small, focused commits
- Use meaningful branch names

## Aplicación en este proyecto

Estas reglas se aplican en el SPA de invitación Festanova (template o modelo sellado). El cambio se queda en el defecto; no se reescribe la arquitectura.

### Estructura canónica
- UI del modelo: `src/app/components/` (hero, events, gifts, rsvp, …).
- Página: `src/app/pages/model-page/`.
- Shared: `src/app/shared/` (servicios, dominio, temas, layout, confirmaciones).
- Copy y datos del modelo: `src/app/constants/model-info.ts` + `src/app/shared/constants/wedding-info.ts`.
- Estilos del modelo: `src/styles/model.css` (shell 1280px + breakpoints 768/1024; prefijo propio del modelo si aplica).
- Assets: `src/assets/images/` (sin subcarpeta del modelId salvo que el diseño lo exija).
- No uses `src/app/features/`; esa ruta ya no existe en la plantilla.

### Reglas concretas
- Constantes: el tope de cupos sale de `seats_reserved` vía `GuestList`. No uses límites inventados. Textos de UI salen de `MODEL_INFO` / `WEDDING_INFO`, no hardcodeados en plantillas.
- DRY: `hasResponded` es el único criterio de invitación ya respondida. `shouldShowExpiredInvitationPage` es la única regla de expiración. La música de fondo pasa por `BackgroundMusicService`.
- Responsabilidad única: `ModelPageComponent` orquesta carga, expiración y modal. Los componentes de sección solo pintan. El dominio (`GuestList`) no lleva copy de interfaz.
- Encapsulación: el puerto que ya existe es `INVITATION_API` (HTTP/mock vía `RoutedInvitationApi`). El estado vive en `InvitationStateService`.
- Temas: cambios de color/assets en `src/app/shared/themes/` y `ACTIVE_THEME`.
- Tests: plazo, cupos, redirección, wizard de confirmación, y utilidades de fecha/tema cuando toque.
- En un `switch` sobre uniones o enums, el `default` debe asignar el valor a `never`. Los imports van al inicio del archivo.
- Los commits son pequeños y el mensaje explica el porqué (Conventional Commits). Solo se crean cuando el usuario lo pide.
