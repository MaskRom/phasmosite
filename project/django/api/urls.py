from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from django.conf.urls import include
from django.urls import path
from .views import *

index_view = TemplateView.as_view(template_name='uri.html')

urlpatterns = [
    path('', login_required(index_view), name='index'),

    path('favo/', FavoApiview.as_view()),
    path('slideshow/', SlideShowApiview.as_view()),
    path('alert/', AlertApiview.as_view()),
    path('tags/', TagsApiview.as_view()),
    path('ghosts/', GhostlistApiview.as_view()),
    path('ghosts/<pk>', GhostApiview.as_view()),
    path('equipments/', EquipmentlistApiview.as_view()),
    path('equipments/<pk>', EquipmentApiview.as_view()),
    path('curseditems/', CursedItemlistApiview.as_view()),
    path('curseditems/<pk>', CursedItemApiview.as_view()),
    path('evidence/', EvidencelistApiview.as_view()),
    path('evidence/<pk>', EvidenceApiview.as_view()),
    path('maps/', MaplistApiview.as_view()),
    path('maps/<pk>', MapApiview.as_view()),
    path('posts/', PostlistApiview.as_view()),
    path('posts/<pk>', CommentApiview.as_view()),
    path('articles/', ArticlelistApiview.as_view()),
    path('articles/<pk>', ArticleApiview.as_view()),

    path('customdifficulty/', CustomDifficultyApiview.as_view()),
    path('customdifficulty/preset/', CustomDifficultyPresetApiview.as_view()),
    path('identification/', IdentificationApiview.as_view()),
]