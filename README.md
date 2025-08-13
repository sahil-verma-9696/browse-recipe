# Functional requirements

1. browse meals categories vice, reel like.
2. search meals by name,category,ingredients.
3. user can schedule(i.e. time for preparing some meals) meal with google calender intigration.
4. user can post new meals.
5. user can like meals.
6. user can comment on meals.
7. user can add hashtag in meal post or comment.
8. user can mention other user in post or comment.
9. user notify for mentions,like,comment

# Core Entites.

1. **User**

   ```js
    User: {
        _id: String, // unique
        name: String,
        email: String, // unique
        password_hash: String,
        avatar_url?: String,
        created_at: Date,
        updated_at: Date
    }
   ```

2. **Meal**

   ```js
    Meal: {
        _id: String, // unique
        title: String,
        description: String,
        category: String, // e.g., 'Dessert', 'Seafood'
        ingredients: [String],
        instructions: String,
        image_url?: String,
        isBelongToMealDB: Boolean,
        posted_by: Ref(User),
        hashtags: [String], // e.g., ["#healthy", "#lowcarb"]
        created_at: Date,
        updated_at: Date
    }
   ```

3. **Like**
   ```js
    Like: {
        _id: String, // unique
        meal_id: Ref(Meal),
        user_id: Ref(User),
        created_at: Date
    }
   ```

4. **Comment**
   ```js
    Comment: {
        _id: String, // unique
        meal_id: Ref(Meal),
        user_id: Ref(User),
        content: String, // raw comment text, may contain @username and #tag
        mentions: [Ref(User)], // list of users mentioned
        hashtags: [String], // extracted tags from content
        created_at: Date
    }
   ```

5. **MealSchedule**
   ```js
    MealSchedule: {
        _id: String, // unique
        meal_id: Ref(Meal),
        user_id: Ref(User),
        scheduled_time: Date, // when the user plans to prepare it
        google_event_id?: String, // for Google Calendar integration
        created_at: Date
    }
   ```

6. **Category**
   
   ```js
    Category: {
        _id: String, // unique
        name: String, // e.g., "Beef", "Chicken", "Dessert"
        description?: String,
        image_url?: String
    }
   ```

7. **Notification**
   ```js
    Notification: {
        _id: String,
        type: "mention", // could expand later: like, comment, etc.
        from_user: Ref(User),
        to_user: Ref(User),
        meal_id?: Ref(Meal),
        comment_id?: Ref(Comment),
        is_read: Boolean,
        created_at: Date
    }
   ```

# 🍽️ Meal App API Specification

This document defines the REST API endpoints for the Meal App, based on the functional requirements and core entities.

---

## 1. Authentication & User Management

### **POST** `/auth/register`

Register a new user.

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": { "_id": "u123", "name": "John Doe", "email": "john@example.com" }
}
```

### **POST** `/auth/login`

Login and receive token.

```json
{
  "email": "john@example.com",
  "password": "securepass"
}
```

**Response:**

```json
{
  "token": "jwt.token.here",
  "user": { "_id": "u123", "name": "John Doe" }
}
```

### **GET** `/users/:id`

Get user profile.
**Response:**

```json
{
  "_id": "u123",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

### **PATCH** `/users/:id`

Update profile.

```json
{
  "name": "John Updated",
  "avatar_url": "https://example.com/new.jpg"
}
```

**Response:** `{ "message": "Profile updated" }`

### **GET** `/users/search?q=John`

Search users by name (for mentions).
**Response:**

```json
[
  { "_id": "u123", "name": "John Doe" },
  { "_id": "u124", "name": "Johnny Smith" }
]
```

---

## 2. Meals

### **GET** `/meals`

Get meals with filters.
Query params: `q`, `category`, `ingredient`, `hashtag`
**Response:**

```json
[
  { "_id": "m123", "title": "Pasta", "category": "Italian", "hashtags": ["#vegan"] }
]
```

### **GET** `/meals/:id`

Get single meal.
**Response:** `{ "_id": "m123", "title": "Pasta", "ingredients": ["Tomato", "Pasta"] }`

### **POST** `/meals`

Create meal.

```json
{
  "title": "Pasta",
  "description": "Delicious vegan pasta",
  "category": "Italian",
  "ingredients": ["Tomato", "Pasta"],
  "instructions": "Boil pasta, add sauce",
  "hashtags": ["#vegan"],
  "mentions": ["u124"]
}
```

**Response:** `{ "message": "Meal created", "meal_id": "m123" }`

### **PATCH** `/meals/:id`

Update meal.

```json
{
  "title": "Updated Pasta"
}
```

**Response:** `{ "message": "Meal updated" }`

### **DELETE** `/meals/:id`

Delete meal.
**Response:** `{ "message": "Meal deleted" }`

---

## 3. Likes

### **POST** `/meals/:id/like`

Like a meal.
**Response:** `{ "message": "Meal liked" }`

### **DELETE** `/meals/:id/like`

Unlike a meal.
**Response:** `{ "message": "Meal unliked" }`

### **GET** `/meals/:id/likes`

Get meal likes.
**Response:** `[ { "_id": "u123", "name": "John Doe" } ]`

---

## 4. Comments

### **GET** `/meals/:id/comments`

Get comments.
**Response:**

```json
[
  {
    "_id": "c123",
    "user_id": { "_id": "u123", "name": "John Doe" },
    "content": "Looks great! @Jane",
    "hashtags": ["#tasty"],
    "mentions": ["u124"]
  }
]
```

### **POST** `/meals/:id/comments`

Add comment.

```json
{
  "content": "This is amazing! #yummy @Jane",
  "mentions": ["u124"]
}
```

**Response:** `{ "message": "Comment added" }`

### **PATCH** `/comments/:id`

Edit comment.

```json
{ "content": "Updated comment" }
```

**Response:** `{ "message": "Comment updated" }`

### **DELETE** `/comments/:id`

Delete comment.
**Response:** `{ "message": "Comment deleted" }`

---

## 5. Scheduling

### **POST** `/meals/:id/schedule`

Schedule meal.

```json
{
  "scheduled_time": "2025-08-20T15:00:00Z",
  "google_event_id": "event123"
}
```

**Response:** `{ "message": "Meal scheduled" }`

### **GET** `/users/:id/schedules`

Get user schedules.
**Response:** `[ { "_id": "s123", "meal_id": "m123", "scheduled_time": "2025-08-20T15:00:00Z" } ]`

### **DELETE** `/schedules/:id`

Delete schedule.
**Response:** `{ "message": "Schedule removed" }`

---

## 6. Categories

### **GET** `/categories`

Get categories.
**Response:** `[ { "_id": "c1", "name": "Dessert" } ]`

### **POST** `/categories`

Create category (admin only).

```json
{ "name": "Dessert", "description": "Sweet dishes" }
```

**Response:** `{ "message": "Category created" }`

### **PATCH** `/categories/:id`

Update category.

```json
{ "name": "Vegan" }
```

**Response:** `{ "message": "Category updated" }`

### **DELETE** `/categories/:id`

Delete category.
**Response:** `{ "message": "Category deleted" }`

---

## 7. Notifications

### **GET** `/notifications`

Get notifications.
**Response:**

```json
[
  { "_id": "n123", "type": "mention", "from_user": { "_id": "u124", "name": "Jane" }, "is_read": false }
]
```

### **PATCH** `/notifications/:id/read`

Mark as read.
**Response:** `{ "message": "Notification marked as read" }`

### **PATCH** `/notifications/read-all`

Mark all as read.
**Response:** `{ "message": "All notifications marked as read" }`

---

## 8. Hashtags & Mentions

### **GET** `/hashtags/:tag`

Get posts/comments with hashtag.
**Response:** `[ { "_id": "m123", "title": "Pasta" } ]`

### **GET** `/mentions`

Get user mentions.
**Response:** `[ { "type": "comment", "content": "@You check this!" } ]`
