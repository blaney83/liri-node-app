# **Welcome to the Liri Entertainment Search**

Comprehensive terminal-based Node application for refined entertainment searches and information.

# Instructions
This section will lay out the various functions of this application.

`Initializing this application:` Please make sure you have node installed on your system and set to your file path. If you are not sure if you do, please open your terminal and run:

    node

If you are not ported into a new, node environment, please visit the following link and follow the steps to set up node on your system: 

    https://nodejs.org/

Before you begin working with my application, please run the following command in your terminal:

    npm install
   

This will initiate the installation of the npm packages associated with this program. To run any of the functions that are listed later in this program make sure that you are including the following code before your function code:

    node liri.js

### What Each Command Should Do

1. CONCERT-THIS

    ```javascript
    node liri.js concert-this <artist/band name here>
    ```

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. SPOTIFY-THIS-SONG

    ```
    node liri.js spotify-this-song <song name here>
    ```

* This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

3. MOVIE-THIS

   ``` 
   node liri.js movie-this <movie name here>
   ```

* This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

4. DO-WHAT-IT-SAYS

    ```
    node liri.js do-what-it-says
    ```

* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

5. SHOW-HISTORY

    ```
    node liri.js show-history
    ```

* Using the `fs` Node package, LIRI will take the text inside of log.txt and then log out all of the stored searches you have performed.


# Video Example

Follow the link below for a video display of each function in opertation:

https://drive.google.com/file/d/1IPqQT5Sv35JQVqHJXKuHV86UljOpCBs0/view