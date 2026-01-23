# Student Edit Feature - Visual Reference

## Form States

### ADD MODE (Default)
```
┌─────────────────────────────────────────────┐
│ ➕ Add New Student                          │
├─────────────────────────────────────────────┤
│ Student Name: [         ]                   │
│ Registration No.: [    ]  Class: [Select]   │
│ Student Email: [             ]              │
│ Parent Name: [         ]                    │
│ Parent Email: [          ]  Parent Phone: [ ]
│                                             │
│              [ + Add Student ]              │
└─────────────────────────────────────────────┘
```

### EDIT MODE (After Clicking Edit)
```
┌─────────────────────────────────────────────┐
│ ✏️ Edit Student                             │
├─────────────────────────────────────────────┤
│ Student Name: [ John Doe        ]           │
│ Registration No.: [ STU001 ] Class: [ A ]   │
│ Student Email: [ john@school.com ]          │
│ Parent Name: [ Mary Doe      ]              │
│ Parent Email: [ mary@email.com ] Phone: [  ]
│                                             │
│       [ ✏️ Update Student ] [ ✕ Cancel ]   │
└─────────────────────────────────────────────┘
```

## Student Table

```
┌─────────────────────────────────────────────────────────────────────────┐
│  #  │ Student Name │ Reg. No. │ Class │ Email        │ Parent Email    │
├─────┼──────────────┼──────────┼───────┼──────────────┼─────────────────┤
│  1  │ John Doe     │ STU001   │   A   │ john@sch.com │ mary@email.com  │
│     │              │          │       │              │ [✏️ Edit] [🗑️ Delete]
├─────┼──────────────┼──────────┼───────┼──────────────┼─────────────────┤
│  2  │ Jane Smith   │ STU002   │   B   │ jane@sch.com │ john@email.com  │
│     │              │          │       │              │ [✏️ Edit] [🗑️ Delete]
└─────┴──────────────┴──────────┴───────┴──────────────┴─────────────────┘
```

## Edit Flow Diagram

```
                    Student Table
                    (List View)
                         │
                         │ User clicks [✏️ Edit]
                         ▼
                    handleEditStudent()
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   Set editingId    Load student    Populate form
   to student._id   data from row   with values
        │                │                │
        └────────────────┼────────────────┘
                         ▼
                  FORM CHANGES TO EDIT MODE
                  (Heading: ✏️ Edit Student)
                  (Button: Update Student)
                  (Cancel button appears)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   [Cancel]        User edits          ✓ Valid
        │            fields              │
        ▼                ▼                ▼
  Reset form      Validate data    handleUpdateStudent()
  Clear values         │                  │
        │              ✗ Invalid          │
        │              │                  ▼
        │              ▼          PUT /api/v1/students/:id
        │          Show error       │
        │          message          │
        │                           ▼
        │                    Backend processes
        │                    Update MongoDB
        │                           │
        │                           ▼
        └──────────────────────►Success!
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
            Show success       Reset form      Refresh table
            message            Clear values    from database
                    │                │                │
                    └────────────────┼────────────────┘
                                     ▼
                         TABLE SHOWS UPDATED DATA
                         FORM BACK TO ADD MODE
```

## Button Behavior Reference

### Edit Button
- **Location**: Last column of each student row
- **Label**: ✏️ Edit
- **Color**: Blue background (#dbeafe)
- **Action**: Opens form in Edit mode
- **Disabled**: During loading operations

### Update Button
- **Visibility**: Only in EDIT mode
- **Label**: ✏️ Update Student
- **Color**: Purple gradient
- **Action**: Submits PUT request to update student
- **Disabled**: During loading or validation errors

### Cancel Button
- **Visibility**: Only in EDIT mode
- **Label**: ✕ Cancel
- **Color**: Gray background
- **Action**: Exits edit mode without saving
- **Disabled**: During loading

### Add Button
- **Visibility**: Only in ADD mode
- **Label**: + Add Student
- **Color**: Purple gradient
- **Action**: Submits POST request to create new student
- **Disabled**: During loading or validation errors

### Delete Button
- **Location**: Last column of each student row
- **Label**: 🗑️ Delete
- **Color**: Red background (#fee2e2)
- **Action**: Removes student after confirmation
- **Disabled**: During loading operations

## Success/Error Messages

### Success Message
```
┌─────────────────────────────────────┐
│ ✓ Student updated successfully!     │
└─────────────────────────────────────┘
(Auto-dismisses after 3 seconds)
```

### Error Message (Validation)
```
┌─────────────────────────────────────────────────────────────┐
│ ✕ Please fill in required fields: Name, Registration      │
│   Number, and Class                                        │
└─────────────────────────────────────────────────────────────┘
(Auto-dismisses after 3 seconds)
```

### Error Message (API)
```
┌──────────────────────────────┐
│ ✕ Failed to update student  │
└──────────────────────────────┘
(Auto-dismisses after 3 seconds)
```

## Data Validation

### Required Fields
- ✓ Student Name (non-empty string)
- ✓ Registration Number (non-empty string)
- ✓ Class (must select from A-L dropdown)

### Optional Fields
- Email (email format, if provided)
- Parent Name (any string)
- Parent Email (email format, if provided)
- Parent Phone (any string)

## Class Selection

### Available Classes
```
┌─────────────┐
│  Class ▼    │
├─────────────┤
│ Select Class│
│      A      │
│      B      │
│      C      │
│      D      │
│      E      │
│      F      │
│      G      │
│      H      │
│      I      │
│      J      │
│      K      │
│      L      │
└─────────────┘
```

## Statistics Dashboard

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│Total Students│   Classes    │ With Email   │With Parent   │
│      5       │      3       │      4       │      3       │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

## Loading Indicator

```
During API operations, a spinning loader appears:

    ⟳ (spinning)

Button shows: ⟳ Loading...
```

## API Response Format

### Update Success Response
```json
{
  "success": true,
  "message": "Student updated successfully!",
  "student": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Updated Name",
    "registrationNumber": "STU001",
    "class": "B",
    "email": "updated@example.com",
    "parentName": "Parent Name",
    "parentEmail": "parent@email.com",
    "parentPhone": "1234567890"
  }
}
```

### Update Error Response
```json
{
  "success": false,
  "message": "Please provide required fields: name, registrationNumber, class"
}
```

