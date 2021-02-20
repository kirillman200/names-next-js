import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ searchTerm, numberOfOccurences, yearOf }) => {
	function dynamicColors() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
	}

	function poolColors(numberOfOccurences) {
		var pool = [];
		var i = 0;
		for (i = 0; i < numberOfOccurences; i++) {
			pool.push(dynamicColors());
		}
		return pool;
	}

	return (
		<div>
			<Bar
				data={{
					labels: yearOf,
					datasets: [
						{
							label: `Number Of Occurences For ${searchTerm}`,
							data: numberOfOccurences,
							backgroundColor: poolColors(numberOfOccurences.length),
							borderColor: poolColors(numberOfOccurences.length),
							borderWidth: 1
						}
					]
				}}
				height={30}
				width={100}
				options={{
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
