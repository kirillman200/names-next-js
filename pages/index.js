import Link from 'next/link';
import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form, Divider, Container, Dimmer, Loader, Segment } from 'semantic-ui-react';
import Chart from '../components/Chart';
import { server } from '../config';
const Index = ({ initialData }) => {
	const [ names, setNames ] = useState(initialData);
	const [ searchTerm, setSearchTerm ] = useState('Default');
	const [ loading, setLoading ] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const req = await fetch(`${server}/api/names?name=${searchTerm}`);
		const newName = await req.json();
		setNames(newName);
		setLoading(false);
	};
	const handleSubmit = () => {
		fetchData();
	};

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const chartData = {};

	for (const name of names) {
		if (chartData[name.year]) {
			chartData[name.year] += name.number;
		} else {
			chartData[name.year] = name.number;
		}
	}

	const numberOfOccurences = Object.values(chartData);
	const yearOf = Object.keys(chartData);

	return (
		<div className='names-container'>
			<h1>Check A History of Your Name</h1>

			<Container className='form-container'>
				<Form onSubmit={handleSubmit}>
					{' '}
					<Form.Field>
						<input placeholder='Search Name' onChange={handleChange} required />
					</Form.Field>
					<Button type='submit'>Submit</Button>
				</Form>
			</Container>

			{loading ? (
				<Segment>
					<div className='loader'>
						<Dimmer active inverted>
							<Loader size='large'>Loading</Loader>
						</Dimmer>
					</div>
				</Segment>
			) : (
				<div>
					<Divider horizontal inverted>
						Chart
					</Divider>
					<Chart searchTerm={searchTerm} numberOfOccurences={numberOfOccurences} yearOf={yearOf} />
					<Divider horizontal inverted>
						All Names
					</Divider>
					<div className='all-names'>
						{names.map((name) => {
							return (
								<div className='cards' key={name._id}>
									<Card>
										<Card.Content>
											<Card.Header>Name: {name.name}</Card.Header>
											<Card.Meta>
												<span className='date'>Gender: {name.gender}</span>
											</Card.Meta>
											<Card.Description>
												<p> State: {name.state}</p>
												<p>Year: {name.year}</p>
											</Card.Description>
										</Card.Content>

										<Card.Content extra>&#8470; Of Occurrences: {name.number}</Card.Content>
									</Card>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

Index.getInitialProps = async () => {
	const req = await fetch(`${server}/api/names?name=Default`);
	const data = await req.json();

	return { initialData: data };
};

export default Index;
