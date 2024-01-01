import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from albums.models import Album
from artists.models import Artist
from songs.models import Song


# @api_view(['POST'])
def Upload_dataset():
    df = pd.read_csv("mini_data5k_delisted.csv")

    artists = [
        Artist(artists=row["artists"], artist_ids=row["artist_ids"])
        for i, row in df.iterrows()
        if not Artist.objects.filter(artist_ids=row["artist_ids"]).exists()
    ]
    Artist.objects.bulk_create(artists, ignore_conflicts=True)
    print("artists uploaded")
    albums = [
        Album(
            album=row["album"],
            album_id=row["album_id"],
            artist_ids=Artist.objects.get(artists=row["artists"]),
        )
        for i, row in df.iterrows()
        if not Album.objects.filter(album_id=row["album_id"]).exists()
    ]
    Album.objects.bulk_create(albums, ignore_conflicts=True)
    print("album uploaded")
    songs = [
        Song(
            id_songs=row["id_songs"],
            name_song=row["name_song"],
            danceability=row["danceability"],
            duration_ms=row["duration_ms"],
            release_date=row["relase_date"],
            album_id=Album.objects.get(album_id=row["album_id"]),
        )
        for i, row in df.iterrows()
        if not Song.objects.filter(id_songs=row["id_songs"]).exists()
    ]
    Song.objects.bulk_create(songs, ignore_conflicts=True)
    print("song uploaded")
    message = "Data Sucessfully Uploaded"
    return message
    # return Response("data uploaded")

    # artists = Artist.objects.all()
    # albums = Album.objects.all()
    # songs = Song.objects.all()
    # art=df['artist_ids'].unique()
    # print(art)
    # print(len(art))
    # # for artist in artists:
    # #     print(artist.artist_ids)
    # df_artists =
    # # artists = [Artist(artists=row['artists'], artist_ids=row['artist_ids']) for i, row in df.iterrows() if not Artist.objects.filter(artist_ids=row["artist_ids"]).exists()]
    # # albums = [Album(album=row['album'], album_id=row['album_id'], artist_ids=Artist.objects.get(artists=row['artists'])) for i, row in df.iterrows() if not Album.objects.filter(album_id=row['album_id']).exists()]
    # # songs= [Song(id_songs=row['id_songs'], name_song=row['name_song'], danceability=row['danceability'], duration_ms=row['duration_ms'],release_date=row['relase_date'], album_id=Album.objects.get(album=row['album'])) for i, row in df.iterrows() if not Song.objects.filter(id_songs=row['id_songs']).exists() ]
    # print("Bulk")

    # import pandas as pd


# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from albums.models import Album
# from artists.models import Artist
# from songs.models import Song

# @api_view(['POST'])
# def Upload_dataset(request):
#     df=pd.read_csv('mini_data5k_delisted.csv')
#     for row in df.iterrows():
#         if not Artist.objects.filter(artist_ids=row["artist_ids"]).exists():
#             artists = [Artist(artists=row['artists'], artist_ids=row['artist_ids']) ]
#         if not Album.objects.filter(album_id=row['album_id']).exists():
#             albums = [Album(album=row['album'], album_id=row['album_id'], artist_ids=Artist.objects.get(artists=row['artists']))]
#         if not Song.objects.filter(id_songs=row['id_songs']).exists():
#             songs= [Song(id_songs=row['id_songs'], name_song=row['name_song'], danceability=row['danceability'], duration_ms=row['duration_ms'],release_date=row['relase_date'], album_id=Album.objects.get(album=row['album'])) ]


#     ar=Artist.objects.bulk_create(artists, ignore_conflicts=True)
#     Album.objects.bulk_create(albums ,ignore_conflicts=True)
#     Song.objects.bulk_create(songs, ignore_conflicts=True)
#     print("bulk create response",ar)
