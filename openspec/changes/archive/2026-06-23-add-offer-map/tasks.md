# Tasks

## Create Feature Structure

- [x] Create directory `src/app/features/offers/offer-map/`
- [x] Create `index.ts` with barrel exports

## Create View Component

- [x] Create `offer-map.view.component.ts`
  - Inputs: `offers`, `currentPosition`
  - Output: `offerSelected`
  - MapLibre GL map initialization
  - Marker creation for each offer
  - Popup on marker click
- [x] Create `offer-map.view.component.html`
- [x] Create `offer-map.view.component.scss`

## Create Container Component

- [x] Create `offer-map.container.component.ts`
  - Inject Store
  - Select offers and currentPosition signals
  - Pass to view
- [x] Create `offer-map.container.component.html`

## Add Route

- [x] Add route `offers/map` to `app.routes.ts`

## Verify

- [x] Run `npm run lint`
- [x] Run `npm run build`
- [ ] Test map page loads with markers
