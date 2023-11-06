import './style.css';
import 'preact/debug';
import { render } from 'preact';

export function App() {
	const initialState = {
		title: 'Learn Preact',
		description:
			"If you're new to Preact, try the interactive tutorial to learn important concepts",
		href: 'https://preactjs.com/tutorial'
	};

	return (
		<section>
			<Resource {...initialState} />
		</section>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}

render(<App />, document.getElementById('app'));
