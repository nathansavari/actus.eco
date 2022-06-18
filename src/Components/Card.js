export default function Card(props) {
  let items = props;
  return (
    <div>
      <div key={items.content}>
        <h3 key={items.title}>{items.title}</h3>
        <h4 key={items.author}>{items.author}</h4>
      </div>
    </div>
  );
}
