import React from 'react';

const soMuchText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae sit beatae ipsa laborum ipsum placeat eius optio nisi alias! Voluptatibus quam, tenetur natus dolor laudantium deleniti adipisci sequi accusamus nemo!';

// class UseState extends Component {
//   state = {
//     expanded: false,
//   };

//   render() {
//     const shortText = soMuchText.slice(0, 50);
//     const { expanded } = this.state;

//     return (
//       <div>
//         { expanded ? soMuchText : shortText }{ ' ' }
//         <button
//           onClick={ () =>
//             this.setState(state => ({ expanded: !state.expanded }))
//           }
//         >
//           { expanded ? 'Less' : 'More' }
//         </button>
//       </div>
//     );
//   }
// }

export default function UseState() {
  const shortText = soMuchText.slice(0, 50);

  const [expanded, setExpanded] = React.useState(false);
  const [count, incrementOrDecrementCount] = React.useState(0);

  return (
    <div>
      {expanded ? soMuchText : shortText}{' '}
      <button onClick={() => setExpanded(expanded => !expanded)}>
        {expanded ? 'Less' : 'More'}
      </button>
      <br />
      Current Count: {count}
      <button onClick={() => incrementOrDecrementCount(count => count + 1)}>
        Increment
      </button>
      <button onClick={() => incrementOrDecrementCount(count => count - 1)}>
        Decrement
      </button>
    </div>
  );
}
