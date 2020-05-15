import React from 'react';

const Card = ({ apps, totalapps }) => {
  console.log(apps);
  return (<table className="table">
    <thead>
      <tr>
        <th scope="col">Comments</th>
        <th scope="col">Vote Count</th>
        <th scope="col">Up Vote</th>
        <th scope="col">News Details</th>
      </tr>
    </thead>
    <tbody>
      {apps.map((app, index) => {
        {/* let title = app._highlightResult.story_title ? app._highlightResult.story_title  */ }
        return (<tr key={app.story_id}>
          <td>{app.num_comments || 0}</td>
          <td>{app.voteCount || 0}</td>
          <td><img src="./../../media/arrow_drop_up-24px.svg" alt="" /></td>
          <td>{app.story_title}</td>
        </tr>)
      })}
    </tbody>

  </table>)
}


export default Card;
