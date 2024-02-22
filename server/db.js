module.exports = {
    boards: [
        {
            id: 1,
            title: "test one board"
        },
        {
            id: 2,
            title: "test three board"
        },
        {
            id: 3,
            title: "test another board"
        }
    ],
    columns: [
        {
            title: "ToDo",
            board_id: 1,
            id: 1
        },
        {
            title: "Doing",
            board_id: 1,
            id: 2
        }
    ],
    tasks: [
        {
            id: 1,
            column_id: 1,
            title: "ToDo",
            done: false
        }
    ]
}
