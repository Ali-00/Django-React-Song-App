from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Album
from artists.models import Artist
from albums.serializers import AlbumSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import render


@api_view(["GET"])
def Routes_album(request):
    routes = ["showalbums/"]
    return Response(routes)


def show_album(request):
    return render(request, "index.html")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def showalbums(request):
    try:
        ar = request.data.get("artists")
        theartist = Artist.objects.get(artists=ar)
        rr = Album.objects.filter(
            artist_ids=theartist).select_related(
            "artist_ids")
        rr_ser = AlbumSerializer(rr, many=True)
        return Response(rr_ser.data)
    except Artist.DoesNotExist:
        return Response({"error": "Artist not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# def showalbums(request):
#     ar = request.data.get('artists')
#     theartist = Artist.objects.get(artists=ar)
#     rr = Album.objects.filter(
#         artist_ids=theartist).select_related('artist_ids')
#     rr_ser = AlbumSerializer(rr, many=True)
#     return Response(rr_ser.data)
