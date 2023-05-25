// ================================================================

// Titanic Dataset challenges! 

// Your goal is to write some functions that will extract
// relevant data from the dataset. 

// Write your code here in this file. 

// *************************************
// Test your code by running: `npm test`
// *************************************

// Each of the functions below expects to receive the Titanic data
// as the parameter data. Your goal is to extract the relevant 
// piece of information from the data and return it. 

// ===============================================================

// ---------------------------------------------------------------
// 1 -------------------------------------------------------------
// Return an array of all the values in data for a given property
// For example if property = 'fare' the output should be a list of 
// all fares something like: [7.3125, 15.75, 7.775, 10.5, ...]
// Or if property = 'age' -> [40, 26, 22, 28, 23, 45, 21, ...]

const getAllValuesForProperty = (data, property) => {
	const values = data.map(item => item.fields[property])
	return values
}

// 2 -------------------------------------------------------------
// Return an array where a given property matches the given value
// For example property = 'sex' and value = 'male' returns an 
// array of all the male passengers [{...}, {...}, {...}, ...]

const filterByProperty = (data, property, value) => {
	const array = data.filter(item => item.fields[property] === value)
	return array
}

// 3 -------------------------------------------------------------
// Filter out missing or null values
// Return an array where the objects that have undefined for a 
// given property have been removed

const filterNullForProperty = (data, property) => {
	const values = data.filter(item => item.fields[property] !== undefined)
	return values
}

// 4 -------------------------------------------------------------
// Abstract the sum by creating a function that returns the sum 
// for any (numeric) property
// Return the total of all values for a given property. This

const sumAllProperty = (data, property) => {
	return data.reduce((sum, item) => {
		const value = item.fields[property];
		if (typeof value === 'number') {
			return value + sum;
		}
			return sum;
	}, 0)
}


// 5 -------------------------------------------------------------
// Count unique values for property. The goal here is return an 
// object with keys equal to the unique values for a property and
// values equal to the number of times that property appears. For
// example the embarked property has three unique values: S, C, 
// and Q, and a couple passengers have undefined for this property. 
// So the output should be: { S: 644, C: 168, Q: 77, undefined: 2 }
// That is 644 passengers embarked at South Hampton. 168 embarked 
// at Cherbourg, 77 emabrked at Queenstown, and 2 are undedfined

const countAllProperty = (data, property) => {
	const count = {};
	data.forEach(item => {
		const value = item.fields[property];
		if (value !== undefined) {
			if (count[value]) {
				count[value]++;
		} else {
			count[value] = 1;
			}
		} else {
			if (count.undefined) {
				count.undefined++;
			} else {
				count.undefined = 1;
				}
			}
		});
		return count
}


// 6 ------------------------------------------------------------
// Make histogram. The goal is to return an array with values 
// of a properties divided into buckets and counting the number
// of items in each bucket.
// step is the value division. For example if step were 10 and the 
// property was age. You would be counting how many passengers were 
// ages 0 - 10, 10 - 20, 20 - 30 etc. 

const makeHistogram = (data, property, step) => {
	const histogram = data.reduce((sum, item) => {
		const value = item.fields[property];
		if (typeof value === 'number') {
			const indexBucket = Math.floor(value / step);
			if (sum[indexBucket]) {
				sum[indexBucket]++;
			} else {
				sum[indexBucket] = 1;
			}
		}
		return sum;
	}, []);
	return Array.from(histogram, (v) => v || 0);
}

// 7 ------------------------------------------------------------
// normalizeProperty takes data and a property and returns an 
// array of normalized values. To normalize the values you need
// to divide each value by the maximum value in the array.

const normalizeProperty = (data, property) => {
	const values = data.map((item) => item.fields[property]).filter(value => !isNaN(value));
	const maximumValue = Math.max(...values);
	const normalizedValues = values.map((value) => value / maximumValue);
	return normalizedValues
};

// 8 ------------------------------------------------------------
// Write a function that gets all unique values for a property. 
// Given the array of data and a property string it should return
// an array of all of the unique values under that property. 
// For example if the property string were "sex" this function 
// would return ['male', 'female']

const getUniqueValues = (data, property) => {
	const valuesArray = data.reduce((values, info) => {
		if (values.includes(info.fields[property])) {
			return values
		} else {
			values.push(info.fields[property])
			return values
		}
	}, [])
	return valuesArray
};

// --------------------------------------------------------------
// --------------------------------------------------------------
module.exports = {
	getAllValuesForProperty,
	filterByProperty,
	filterNullForProperty,
	sumAllProperty,
	countAllProperty,
	makeHistogram,
	normalizeProperty,
	getUniqueValues
}