# Map Capability Spec (Delta)

## Overview

Add user position marker to map display.

## Features

### F1: User Position Marker

- Display pulsing blue dot at `currentPosition` coordinates
- Distinct visual style from offer markers (pulsing animation + blue color)
- Map centered on user position on initial load

## State Integration

| Selector | Type | Description |
|----------|------|-------------|
| `selectCurrentPosition` | `OfferLocation` | User position (center + marker) |

## Implementation Status

| Component | Status |
|-----------|--------|
| User Position Marker | ✓ Implemented |
