-- Seed movies table with sample data
INSERT INTO public.movies (title, description, poster_url, backdrop_url, release_year, rating, duration, genre, type, is_netflix_original, trailer_url) VALUES
  ('Stranger Things', 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.', 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg', 2016, 'TV-14', '50m per episode', ARRAY['Drama', 'Fantasy', 'Horror'], 'series', true, NULL),
  
  ('Wednesday', 'Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers and solve a monster mystery.', 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', 'https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg', 2022, 'TV-14', '45m per episode', ARRAY['Comedy', 'Crime', 'Fantasy'], 'series', true, NULL),
  
  ('The Witcher', 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg', 'https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg', 2019, 'TV-MA', '60m per episode', ARRAY['Action', 'Adventure', 'Fantasy'], 'series', true, NULL),
  
  ('Squid Game', 'Hundreds of cash-strapped players accept a strange invitation to compete in children games. Inside, a tempting prize awaits with deadly high stakes.', 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg', 'https://image.tmdb.org/t/p/original/qw3J9cNeLioOLoR68WX7z79aCdK.jpg', 2021, 'TV-MA', '55m per episode', ARRAY['Action', 'Drama', 'Mystery'], 'series', true, NULL),
  
  ('Money Heist', 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.', 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg', 'https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg', 2017, 'TV-MA', '45m per episode', ARRAY['Action', 'Crime', 'Drama'], 'series', true, NULL),
  
  ('Dark', 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes relationships among four families.', 'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg', 'https://image.tmdb.org/t/p/original/75GFqrnlNyFmaXYE0iPNnB7dEhp.jpg', 2017, 'TV-MA', '60m per episode', ARRAY['Crime', 'Drama', 'Mystery'], 'series', true, NULL),
  
  ('Glass Onion', 'Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Blanc is on the case.', 'https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg', 'https://image.tmdb.org/t/p/original/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg', 2022, 'PG-13', '2h 19m', ARRAY['Comedy', 'Crime', 'Drama'], 'movie', true, NULL),
  
  ('All Quiet on the Western Front', 'A young German soldier experiences the horrors of World War I on the Western Front, witnessing the toll it takes on him and his comrades.', 'https://image.tmdb.org/t/p/w500/2IRjbi9cADuDMKmHdLK7LaqQDKA.jpg', 'https://image.tmdb.org/t/p/original/pxJbfnMIQQxCrdeLD0zQnWr6ouL.jpg', 2022, 'R', '2h 28m', ARRAY['Action', 'Drama', 'War'], 'movie', true, NULL),
  
  ('The Adam Project', 'After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self for a mission to save the future.', 'https://image.tmdb.org/t/p/w500/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg', 'https://image.tmdb.org/t/p/original/jO9tE9lmJILWLfaZv29TzGVsEYm.jpg', 2022, 'PG-13', '1h 46m', ARRAY['Action', 'Adventure', 'Comedy'], 'movie', true, NULL),
  
  ('Don''t Look Up', 'Two low-level astronomers must go on a giant media tour to warn mankind of an approaching comet that will destroy planet Earth.', 'https://image.tmdb.org/t/p/w500/th4E1yqsE8DGpAseLiUrI60Hf8V.jpg', 'https://image.tmdb.org/t/p/original/kXzs3SdvAXK5z9vcL3QBD3PTqVh.jpg', 2021, 'R', '2h 18m', ARRAY['Comedy', 'Drama', 'Sci-Fi'], 'movie', true, NULL),
  
  ('Red Notice', 'An FBI profiler pursuing the world''s most wanted art thief becomes his reluctant partner in crime to catch an elusive crook who''s always one step ahead.', 'https://image.tmdb.org/t/p/w500/lAXONuqg41NwUMuzMiFvicDET9Y.jpg', 'https://image.tmdb.org/t/p/original/m9suvI2wyqfNaKOSkRdCKjDKr6N.jpg', 2021, 'PG-13', '1h 58m', ARRAY['Action', 'Comedy', 'Crime'], 'movie', true, NULL),
  
  ('Extraction', 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.', 'https://image.tmdb.org/t/p/w500/wlfDxbGEsW58vGhFljKkcR5IxDj.jpg', 'https://image.tmdb.org/t/p/original/1R6cvRtZgsYCkh8UFuWFN33xBP4.jpg', 2020, 'R', '1h 56m', ARRAY['Action', 'Thriller'], 'movie', true, NULL),
  
  ('The Gray Man', 'When a shadowy CIA agent uncovers damning agency secrets, he''s hunted across the globe by a sociopathic rogue operative.', 'https://image.tmdb.org/t/p/w500/8cXbitsS6dWQ5gfMTZdorpW5Idf.jpg', 'https://image.tmdb.org/t/p/original/kHyVx2HvXGzOz4ywTNUbXwFn7Pm.jpg', 2022, 'PG-13', '2h 9m', ARRAY['Action', 'Thriller'], 'movie', true, NULL),
  
  ('Enola Holmes', 'When Enola Holmes discovers her mother missing, she sets off to find her, becoming a super-sleuth in her own right as she outwits her famous brother Sherlock.', 'https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg', 'https://image.tmdb.org/t/p/original/kMe4TKMDNXTKptQPAdOF0oZHq3V.jpg', 2020, 'PG-13', '2h 3m', ARRAY['Action', 'Adventure', 'Crime'], 'movie', true, NULL),
  
  ('Bird Box', 'Five years after an ominous unseen presence drives most of society to suicide, a mother and her two children make a desperate bid to reach safety.', 'https://image.tmdb.org/t/p/w500/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg', 'https://image.tmdb.org/t/p/original/z6m7s4w4Erxnr5k3XYbS2LjBo8n.jpg', 2018, 'R', '2h 4m', ARRAY['Drama', 'Horror', 'Sci-Fi'], 'movie', true, NULL),
  
  ('The Crown', 'Follows the political rivalries and romance of Queen Elizabeth II''s reign and the events that shaped the second half of the twentieth century.', 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg', 'https://image.tmdb.org/t/p/original/4ffn3hYsYrUPwjvP3K2R1ICqmJW.jpg', 2016, 'TV-MA', '58m per episode', ARRAY['Biography', 'Drama', 'History'], 'series', true, NULL),
  
  ('Ozark', 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.', 'https://image.tmdb.org/t/p/w500/pCGyPVrI9Fzw6rCBuwkOYMdF2Th.jpg', 'https://image.tmdb.org/t/p/original/hHrMqmEH7U0ogfnsArqbUMPuPxC.jpg', 2017, 'TV-MA', '60m per episode', ARRAY['Crime', 'Drama', 'Thriller'], 'series', true, NULL),
  
  ('Bridgerton', 'Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family.', 'https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg', 'https://image.tmdb.org/t/p/original/m0TbLsvjfFoJnHlI9wHUELNf7Zb.jpg', 2020, 'TV-MA', '60m per episode', ARRAY['Drama', 'Romance'], 'series', true, NULL),
  
  ('Cobra Kai', 'Decades after their 1984 All Valley Karate Tournament bout, a middle-aged Daniel LaRusso and Johnny Lawrence find themselves martial-arts unable again.', 'https://image.tmdb.org/t/p/w500/6GDW4EsgsXlYrL1ASb5eCHQK4er.jpg', 'https://image.tmdb.org/t/p/original/g63HmYpQMtv2rorHQN8F6aKkWVg.jpg', 2018, 'TV-14', '30m per episode', ARRAY['Action', 'Comedy', 'Drama'], 'series', true, NULL),
  
  ('You', 'A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by.', 'https://image.tmdb.org/t/p/w500/7bEYwjKvzKgWYNHMqmP6Znb5Zxb.jpg', 'https://image.tmdb.org/t/p/original/cJKvyxY9PKDzaIBdCH17jLk2aOu.jpg', 2018, 'TV-MA', '45m per episode', ARRAY['Crime', 'Drama', 'Romance'], 'series', true, NULL)
  
ON CONFLICT DO NOTHING;
