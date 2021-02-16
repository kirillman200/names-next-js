import Link from 'next/link';
import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form, Divider, Container, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import Chart from '../components/Chart';
const Index = ({ initialData }) => {
	const [ names, setNames ] = useState(initialData);
	const [ searchTerm, setSearchTerm ] = useState('Default');
	const [ loading, setLoading ] = useState(false);

	const fetchData = async () => {
		// alert(searchTerm);
		setLoading(true);
		const req = await fetch(`http://localhost:3000/api/names?name=${searchTerm}`);
		const newName = await req.json();
		setNames(newName);
		setLoading(false);
		// event.preventDefault();
	};
	const handleSubmit = () => {
		// event.preventDefault();
		fetchData();
	};

	// useEffect(() => {
	// 	(async () => {

	// 		await handleSubmit();
	// 	})();
	// }, []);
	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const numberOfOccurences = names.map((opt) => opt.number);
	const yearOf = names.map((opt) => opt.year);
	// if (loading) {
	// 	return (
	// 		<div>
	// 			<h2> Loading...</h2>
	// 			<div className='loader'>
	// 				{/* <img src='../../../public/tail-spin.svg' class='img-fluid' alt='Responsive image' /> */}
	// 			</div>
	// 		</div>
	// 	);
	// } else {
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
			{/* <form className='search-bar' onSubmit={handleSubmit}>
							<input
								type='text'
								name='name'
								placeholder='Search Name'
								className='search-input'
								onChange={handleChange}
								required
							/>

							<button type='submit'>Send</button>
						</form> */}

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
										</Card.Content>
										<Card.Content extra>
											Gender: {name.gender}
											State: {name.state}
											<br />
											Year: {name.year}
											<br />
											&#8470; Of Occurrences: {name.number}
										</Card.Content>
									</Card>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
	// }
};

Index.getInitialProps = async () => {
	const req = await fetch(`http://localhost:3000/api/names?name=Default`);
	const data = await req.json();

	return { initialData: data };
};

export default Index;
