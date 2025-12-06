# 🚀 Text-Based RPG Project Requirements Document

## I. Core Game Concept & Mechanics

This game is a narrative-driven, choice-based, modern **Sandbox RPG** focused on resource management and consequence rather than traditional turn-based combat.

| Requirement | Details |
| :--- | :--- |
| **Genre & Setting** | Modern, Open-Ended, Sandbox Experience |
| **Player Viewpoint** | Single Character |
| **Progression** | Level up/improve stats solely by acquiring specific items. |
| **Game Over** | Player health drops to 0. A "Game Over" screen is displayed with an option to restart. |
| **Core Loop** | Read Scene Text → Review Stats/Inventory → Make Choice (Button Click) → Apply Consequence (Stat/Item Change) → Load Next Scene. |

### Player Attributes

The player tracks two core stats and an inventory:

| Stat | Description | Progression |
| :--- | :--- | :--- |
| **Health** | Player hit points (Default: 100). Drops to 0 triggers Game Over. | Increased by acquiring specific items (e.g., permanent health boost items) or by using consumables. |
| **Strength** | Primary stat for success checks. | Permanently increased by acquiring specific items (e.g., weapons or tools). |
| **Inventory** | List of collected items (`item_ID`s). | Used for **Prerequisite Checks** in choices and tracking consumables/weapons. |

---

## II. Technical Architecture & Hosting

The game will be built as a single-page application (SPA) hosted on GitHub Pages.

| Component | Requirement |
| :--- | :--- |
| **Hosting** | **GitHub Pages** (Static hosting from the repository). |
| **Technology** | **HTML, CSS, and Vanilla JavaScript** (No external frameworks like React/Vue). |
| **Game State** | Player progress is saved to the user's **Browser Local Storage**. |
| **Input Method** | Player actions are executed by **clicking HTML buttons**. |
| **Code Structure** | **Separation of Concerns:** `main.js` (Logic/Engine) and `ui.js` (Presentation/Rendering/Transitions). |

### File Structure

The project will use the following root structure:

/ ├── index.html ├── main.js <-- Game Logic / Engine ├── ui.js <-- Rendering / Animations / UI Events ├── style.css └── data/ <-- Game content files ├── scenes.json └── items.json

---

## III. Data Structure Requirements

All game content must be stored in external **JSON files**.

### 1. `data/scenes.json` (The Narrative Flow)

The primary structure for narrative and choice logic. Scenes link via unique `scene_ID`.

| Property | Description |
| :--- | :--- |
| **`id`** | Unique identifier for loading the scene. |
| **`text`** | The narrative text to display. |
| **`choices`** | Array of Choice Objects (contains two choices). |
| **Choice Object** | |
| **`text`** | Button label text. |
| **`prerequisite`** | Object (Optional) condition required to attempt the choice (e.g., `{"item_id": "stapler"}`). |
| **`next_scene_id`** | The scene ID to load on **success**. |
| **`fail_scene_id`** | The scene ID to load on **failure** of the prerequisite check. |
| **`consequence`** | The immediate effect: `{"stat": "health", "change": -5}` or `{"item_id": "coffee_mug", "change": "add"}`. |

### 2. `data/items.json` (Progression and Resources)

Defines all items and their effects. Item effects can be permanent (for gear/weapons) or temporary (for consumables).

| Property | Description |
| :--- | :--- |
| **`id`** | Unique identifier for linking from scenes/inventory. |
| **`name`** | Display name. |
| **`type`** | `"weapon"`, `"consumable"`, or `"key_item"`. |
| **`effect`** | Defines stat impact: `{"stat": "strength", "value": 5, "is_permanent": true}`. |

---

## IV. User Interface (UI) Requirements

The UI must persistently display the following elements, managed primarily by `ui.js`:

| UI Element | Function |
| :--- | :--- |
| **Game Text** (`#game-text`) | Central display area. Old text is **replaced** by new text upon scene change. |
| **Choice Buttons** (`#choice-buttons`) | Must display **two** buttons per scene. |
| **Health** (`#player-health`) | Persistent display of current Health. |
| **Strength** (`#player-strength`) | Persistent display of current effective Strength score. |
| **Inventory** (`#inventory-display`) | A toggleable panel listing collected item names. |
| **Game Start** (`main.js`) | Game must begin immediately on the first visit to the webpage by loading the `initialPlayerState` and rendering the `start_scene_id`. |

---