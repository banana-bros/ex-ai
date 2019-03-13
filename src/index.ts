import { TFIDFVectorizer } from './tf_idf/TFIDFVectorizer';
import * as Plotly from 'plotly';
import * as fs from 'fs';
import { KMeans } from './k-means/KMeans';
import { JSONParser } from './JSONParser';
import { Vector } from './type/Vector';
import { KMeansExporter } from './KMeansExporter';
import { MedianCentroidCalculator } from './calculator/centroid_calculator/MedianCentroidCalculator';

export * from './k-means/KMeans';
export * from './Cluster';
/**/

/*console.log(`Parsing genres`);
const artist_to_genre = JSONParser.toMap('artist_to_genre.json');
console.log(`Parsing lyrics`);
const lyrics = JSONParser.toArray('artist_lyrics.json');

const artists = [];
const genres = [];

const yGenreIndizes = [];
const yGenres = [];


for (const artist of artist_to_genre.keys()) {
    artists.push(artist);
    if (genres.indexOf(artist_to_genre.get(artist)) === -1) {
        genres.push(artist_to_genre.get(artist));
    }
}

console.log(`Starting TF-IDF`);
const tf_idf = new TFIDFVectorizer(lyrics);
const tfIdfResult = tf_idf.start();
console.log(`Getting matrix`);
const fitted_matrix = tf_idf.getVectorizedResult();
tf_idf.printMostImportant(1);

console.log(`Fitting with K-Means`);
const kMeans = new KMeans(fitted_matrix, 10);
const result = kMeans.start();
console.log(`${result.iterations} iterations needed`);
const predictedGenreIndizes = kMeans.predict(fitted_matrix);
const correctGenreIndizes = [];

for (const artist of artist_to_genre.keys()) {
    correctGenreIndizes.push(genres.indexOf(artist_to_genre.get(artist)));
}

for (let i = 0; i < predictedGenreIndizes.length; i++) {
    yGenres[predictedGenreIndizes[i]] = yGenreIndizes[i];
}

const plotly = Plotly('DarkSephiroth', 'B1y6jFXsprLx9sjLadsg');
const data: Plotly.PlotData[] = [{
    x: artists,
    y: correctGenreIndizes,
    type: 'scatter',
    mode: 'markers',
    name: 'correct',
    text: yGenres
}, {
    x: artists,
    y: predictedGenreIndizes,
    type: 'scatter',
    mode: 'markers',
    name: 'predicted',
    text: yGenres
}];

const layout = { title: 'Hover over the points to see the text' };
const graphOptions = { layout: layout, filename: 'hover-chart-basic', fileopt: 'overwrite' };

plotly.plot(data, graphOptions, (err: string, msg: string) => {
    if (err) {
        return console.log(err);
    }

    console.log(msg);
});

/**/
