from rest_framework import pagination


class RoomsPagination(pagination.PageNumberPagination):
    page_size = 20
