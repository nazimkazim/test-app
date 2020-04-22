import React from 'react';
import {Link} from 'react-router-dom'



export default function List() {

    return (
        <article class="panel is-info">
            <div class="panel-block">
                <Link to="/">Температура</Link>
            </div>
            <div class="panel-block">
                <Link to="/precipitation">Осадки</Link>
            </div>
        </article>
    );
}