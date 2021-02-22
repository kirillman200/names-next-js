import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ searchTerm, numberOfOccurences, yearOf }) => {
	function dynamicColors() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return 'rgba(' + r + ',' + g + ',' + b + ', 0.7)';
	}

	function poolColors(yearOf) {
		var pool = [];
		var i = 0;
		for (i = 0; i < yearOf; i++) {
			pool.push(dynamicColors());
		}
		return pool;
	}
	const [ colors, setColors ] = useState([]);

	useEffect(() => {
		setColors(poolColors(yearOf.length));
	}, []);

	return (
		<div>
			<Bar
				data={{
					labels: yearOf,
					datasets: [
						{
							label: `Number Of Occurences For ${searchTerm}`,
							data: numberOfOccurences,
							backgroundColor: colors,
							borderColor: colors,
							borderWidth: 1,
							maxBarThickness: 100
						}
					]
				}}
				height={50}
				width={100}
				options={{
					animation: {
						duration: 0
					},
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true
								}
							}
						]
					}
				}}
			/>
		</div>
	);
};

export default Chart;
