import React, { Component } from 'react';
import {render} from 'react-dom';
import KanbanBoard from './KanbanBoard'

let cardsList = [
    {
        id: 1,
        title: 'Read the book',
        description: 'I shoul read the whole book',
        status: 'in-progress',
        tasks: [
            {
                id: 1,
                name: '테스트',
                done: true
            },
            {
                id: 2,
                name: 'test2',
                done: false
            }
        ]
    },
    {
        id: 2,
        title: 'Write some Code',
        description: 'Code along with the samples in the book',
        status: 'todo',
        tasks: [
            {
                id: 1,
                name: 'ContentList Example',
                done: true
            },
            {
                id: 2,
                name: 'ContentList Example2',
                done: false
            },
            {
                id: 3,
                name: 'ContentList Example3',
                done: false                
            }
        ]
    },
    {
        id: 3,
        title: 'List Test3',
        description: '묘사하다.3',
        status: 'done',
        tasks:[]
    }
];
render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));
