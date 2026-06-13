# Map Capability Spec

## Overview

Interactive map display for visualizing offers geographically.

## Technology Stack

| Component     | Technology        |
|---------------|-------------------|
| Map Client    | MapLibre GL       |
| Map Tiles     | OpenFreeMap       |
| Geocoding     | MapTiler          |
| Coordinates   | Longitude/Latitude|

## Features

### F1: Map Display

- Display offers as markers on an interactive map
- Map is centered on user's current position or default (Basel)
- Zoom and pan controls
- Responsive design (mobile-friendly)

### F2: Offer Markers

- Each published offer shown as a marker
- Marker indicates category (via icon/color)
- Clicking a marker shows offer preview/popup

### F3: User Position

- Detect user's current position (with permission)
- Show user's location on map
- Allow centering map on user location

### F4: Address Search (Geocoding)

- User can search for an address
- Map centers on searched location
- Used when creating/editing offers

## Implementation Status

| Component | Status |
|-----------|--------|
| MapLibre Integration | ✗ Not implemented |
| OpenFreeMap Tiles | ✗ Not implemented |
| Offer Markers | ✗ Not implemented |
| User Position Detection | ✗ Not implemented |
| Address Search | ✗ Not implemented |
| MapTiler Integration | ✗ Not implemented |

## Notes

- README mentions OpenFreeMap as tile source
- MapLibre planned but not yet integrated
- Default coordinates in state: Münsterplatz, Basel (47.556431, 7.591641)