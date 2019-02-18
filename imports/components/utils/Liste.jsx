import React from 'react';

const Liste = (props) => {

        return (
            <ul>

                {
                    props.data.map((item) => {
                        return <li key={item._id}><a href={`/sessions/${item._id}`}>{item.titre}</a></li>
                    })
                }

            </ul>
        )

   
}

export default Liste;