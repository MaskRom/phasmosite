from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db.models import Count
from django.http import Http404
from rest_framework import pagination
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from ipware import get_client_ip
from django.db.models import Q
from .serializers import *
from .models import *
import random


#====================PAGE====================
class DefaultPagination(pagination.PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 500


#====================FAVO====================
class FavoApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        ipuser, _ = get_client_ip(request)
        target = request.GET.get('target')
        uuid = request.GET.get('uuid')
        if target == 'P':
            target_post = get_object_or_404(Post, slug=uuid)
            m = Favorite(ipuser=ipuser, target_P=target_post)
            n = Favorite.objects.filter(ipuser=ipuser, target_P=target_post)
        elif target == 'C':
            target_comment = get_object_or_404(Comment, slug=uuid)
            m = Favorite(ipuser=ipuser, target_C=target_comment)
            n = Favorite.objects.filter(ipuser=ipuser, target_C=target_comment)
        elif target == 'A':
            target_article = get_object_or_404(Article, slug=uuid)
            m = Favorite(ipuser=ipuser, target_A=target_article)
            n = Favorite.objects.filter(ipuser=ipuser, target_A=target_article)
        else: raise Http404()
        if n:
            n.delete()
            return Response('0')
        else:
            m.save()
            return Response('1')



#====================ALERT====================
class AlertApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        alert_data = Alert.objects.filter(show=True)
        ser = AlertSerializer(instance=alert_data, many=True)
        return Response(ser.data)



#====================SLIDESHOW====================
class SlideShowApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        slideshow_data = SlideShow.objects.filter(show=True)
        ser = SlideShowSerializer(instance=slideshow_data, many=True)
        return Response(ser.data)



#====================TAG15====================
class TagsApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs) -> list:
        '''投稿に関連付けられたタグ上位30件を取得し、ランダムに15件を返す'''
        tags_data = Ghost.tags.most_common()[:30]
        ser = TagsSerializer(instance=tags_data, many=True)
        data = [s['name'] for s in ser.data]
        random.shuffle(data)
        return Response(data[:15])



#====================GHOST====================
class GhostlistApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        '''Ghostテーブルからslug, name, level を抽出したリストを返す'''
        ghostlist_data = Ghost.objects.all().order_by('order')
        ser = GhostlistSerializer(instance=ghostlist_data, many=True)
        return Response(ser.data)

class GhostApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, pk, *args, **kwargs):
        '''URLのpkを取得し、Ggohstテーブルから関連したレコードをjsonで返す'''
        ghost_data = get_object_or_404(Ghost, pk=pk)
        ser = GhostSerializer(instance=ghost_data)
        return Response(ser.data)



#====================EQUIPMENT====================
class EquipmentlistApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        '''Equipmentテーブルから装備タイプ別に分けたjosnを返す'''
        equipments_data = Equipment.objects.all().order_by('order')
        eq_type = EquipmentType.objects.all().order_by('order')
        ser = EquipmentlistSerializer(instance=equipments_data, many=True)

        bytype = [[{
            'slug'  : item['slug'],
            'name'  : item['name'],
            'image1': item['image1']
            } for item in ser.data if item['equipment_type'] == typ.slug]
            for typ in eq_type]
        results = [{'name':eq_type[n].name, 'item':bytype[n]}
            for n in range(eq_type.count())]

        return Response(results)

class EquipmentApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, pk, *args, **kwargs):
        equipment_data = get_object_or_404(Equipment, pk=pk)
        ser = EquipmentSerializer(instance=equipment_data)
        return Response(ser.data)



#====================CURSEDITEM====================
class CursedItemlistApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        cursedItems_data = CursedItem.objects.all().order_by('order')
        ser = CursedItemlistSerializer(instance=cursedItems_data, many=True)
        return Response(ser.data)

class CursedItemApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, pk, *args, **kwargs):
        cursedItem_data = get_object_or_404(CursedItem, pk=pk)
        ser = CursedItemSerializer(instance=cursedItem_data)
        return Response(ser.data)



#====================GAMEMAP====================
class MaplistApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        maplist_data = Map.objects.all().order_by('order')
        ser = MaplistSerializer(instance=maplist_data, many=True)
        return Response(ser.data)

class MapApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, pk, *args, **kwargs):
        map_data = get_object_or_404(Map, pk=pk)
        ser = MapSerializer(instance=map_data)
        return Response(ser.data)



#====================EVIDENCE====================
class EvidencelistApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        evidencelist_data = Evidence.objects.order_by('order')
        ser = EvidencelistSerializer(instance=evidencelist_data, many=True)
        return Response(ser.data)

class EvidenceApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, pk,  *args, **kwargs):
        evidence_data = get_object_or_404(Evidence, pk=pk)
        ser = EvidenceSerializer(instance=evidence_data)
        return Response(ser.data)



#====================POST====================
class PostlistApiview(APIView,  DefaultPagination):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        '''sort=true: 最新順, sort=false: 古い順'''
        sort = True if request.GET.get('sort') == 'true' else False
        tags = request.GET.getlist('tags')

        q = Q()
        for t in tags:
            q.add(Q(tags__name=t), Q.OR)

        postlist_data = Post.objects.filter(q)\
            .order_by(f'{"-" if sort else ""}created_at').annotate(
            commentSum=Count('comment'), favoriteSum=Count('favorite'))

        postlist_data_page = self.paginate_queryset(
            postlist_data, request, view=self)

        ser = PostlistSerializer(
            instance=postlist_data_page,
            context={'ipuser': get_client_ip(request)},
            many=True)

        return Response(ser.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        ser = PostSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentApiview(APIView,  DefaultPagination):
    permission_classes = [permissions.AllowAny]
    def get(self, request, pk, *args, **kwargs):
        '''source==True?ソース投稿:ページテーションコメント '''
        source = request.GET.get('source')
        sort = True if request.GET.get('sort') == 'true' else False
        if source:
            try:
                post_data = Post.objects.annotate(
                commentSum=Count('comment'),
                favoriteSum=Count('favorite')).get(pk=pk)
            except Post.DoesNotExist:
                raise Http404()
            post_ser = PostlistSerializer(
              instance=post_data, context={'ipuser': get_client_ip(request)})
            return Response(post_ser.data)
        else:
            comment_data = Comment.objects.filter(target=pk)\
                .annotate(favoriteSum=Count('favorite'))\
                .order_by(f'{"-" if sort else ""}created_at')

            comment_data_page = self.paginate_queryset(
                comment_data, request, view=self)

            comment_ser = CommentlistSerializer(
                instance=comment_data_page,
                context={'ipuser': get_client_ip(request)},
                many=True)
            return Response(comment_ser.data)


    def post(self, request, format=None):
        
        pass



#====================ARTICLE====================
class ArticlelistApiview(APIView,  DefaultPagination):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        '''sort=0: 最新順, sort=1: 古い順'''
        sort = True if request.GET.get('sort') == 'true' else False
        tags = request.GET.getlist('tags')
        q = Q()
        for t in tags:
            q.add(Q(tags__name=t), Q.OR)
        articlelist_data = Article.objects\
            .order_by(f'{"-" if sort else ""}created_at')\
            .annotate(favoriteSum=Count('favorite'))
        articlelist_data_page = \
            self.paginate_queryset(articlelist_data, request, view=self)

        ser = ArticlelistSerializer(
            articlelist_data_page,
            context={'ipuser': get_client_ip(request)},
            many=True)
        return Response(ser.data)

class ArticleApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, pk,  *args, **kwargs):
        try:
            article_data =Article.objects\
                .annotate(favoriteSum=Count('favorite')).get(pk=pk)
        except Article.DoesNotExist:
            raise Http404()

        ser = ArticleSerializer(
            instance=article_data, context={'ipuser': get_client_ip(request)})

        return Response(ser.data)



    #####  #####  #####  #
      #    #   #  #   #  #
      #    #   #  #   #  #
      #    #####  #####  #####
#====================CUSTOMDIFFICULTY====================
class CustomDifficultyApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        difficulty_data = CustomDifficultyItem.objects.all().order_by('order')
        di_type = CustomDifficultyType.objects.all().order_by('order')

        ser = CustomDifficultySerializer(instance=difficulty_data, many=True)

        bytype = [
            [item for item in ser.data if item['difficulty_type'] == typ.slug]
                for typ in di_type]

        results = [{
            'name':di_type[n].name,
            'help':di_type[n].help,
            'item':bytype[n]}
                for n in range(di_type.count())]

        return Response(results)


class CustomDifficultyPresetApiview(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        preset_data = CustomDifficultyPreset.objects.all().order_by('order')
        ser = CustomDifficultyPresetSerializer(instance=preset_data, many=True)
        return Response(ser.data)



#====================IDENTIFICATION====================
class IdentificationApiview(APIView):
    permission_classes = [permissions.AllowAny]
    '''frontend
        APIContextからevidenceTop[name], ghostTop[name]を取得
        Feature->list と byGhost->dic を新たにこのAPIから取得
        evidenceTopとFeatureをViewに表示 →　3パターンの状態（n, c, e）
        ghost別倍率用変数 = 1 に対して、
        nの場合→ 何もしない
        cの場合→ slugを取得し対象の値を掛ける
        eの場合→ slugを取得し100から対象の値を引いた値を掛ける
    '''
    def get(self, request, *args, **kwargs):

        item = request.GET.get('item') and True

        if item:
            feature_data = Feature.objects.all().order_by('order')
            feature_ser = IdentificationSerializer(
                instance=feature_data, many=True)
            fe_type = FeatureType.objects.all().order_by('order')

            bytype = [
                [item for item in feature_ser.data
                    if item['feature_type'] == typ.id]for typ in fe_type]

            results = [{
            'name':fe_type[n].name,
            'help':fe_type[n].help,
            'curse':fe_type[n].curse and fe_type[n].curse.slug,
            'item':bytype[n]}
                for n in range(fe_type.count())]

            return Response(results)

        else:
            byGhost_data = Ghost.objects.all().order_by('order')
            byGhost_ser = ByGhostSerializer(instance=byGhost_data, many=True)
            return Response(byGhost_ser.data)