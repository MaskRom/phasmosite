from taggit.serializers import TagListSerializerField, TaggitSerializer
from rest_framework.utils.serializer_helpers import ReturnDict
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from django.utils import timezone
from api.models import *
import datetime


#taggitシリアライザのオーバーライド（未使用）
 # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
class StringListField(serializers.ListField):
    child = serializers.CharField()
    def to_representation(self, data):
        return ' '.join(data.values_list('name', flat=True))


#====================TAG15====================
class TagsSerializer(serializers.Serializer):
    #slug = serializers.SlugField()
    name = serializers.CharField()



#====================ALERT===================
class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        exclude = ["id", 'show']



#====================SLIDESHOW====================
class  SlideShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlideShow
        exclude = ["id", 'show']



#====================GHOST====================
def ghost_format(item) -> dict:
    slug = item['slug']
    item['updated_at'] = relative_time(item['updated_at'])

    evidencelist = [{
        'slug': e.evidence.slug,
        'name': e.evidence.name,
        'possibility': e.possibility,
        'confirm': e.confirm}
     for e in EvidencePossibility.objects.filter(ghost=slug)]
    item['evidence'] = evidencelist

    huntLinelist = [{
        'text': h.text,
        'sanity': h.sanity}
     for h in HuntLine.objects.filter(ghost=slug)]
    item['huntline'] = huntLinelist

    speedlist = [{
        'situation': s.situation,
        'value': s.value}
     for s in Speed.objects.filter(ghost=slug)]
    item['speed'] = speedlist

    featurelist = [{
        'feature': f.text}
     for f in FeaturePossibility.objects.filter(ghost=slug, page_on=True)]
    item['feature'] = featurelist
    
    return item
    
class GhostlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ghost
        fields = ['slug', 'name', 'level']

class GhostSerializer(serializers.ModelSerializer, TaggitSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Ghost
        exclude = ['created_at', 'order']
    def to_representation(self, obj):
        item = super().to_representation(obj)
        ret = ghost_format(item)
        return ret



#====================EQUIPMENT====================
class EquipmentlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ['equipment_type', 'slug', 'name', 'name_en', 'image1']

class EquipmentSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Equipment
        exclude = ['created_at', 'order']
    def to_representation(self, obj):
        item = super().to_representation(obj)
        item['updated_at'] = relative_time(item['updated_at'])
        evidencelist = [{
            'slug': i.evidence.slug,
            'name': i.evidence.name,
            'text': i.text}
            for i in Identifiable.objects.filter(equipment=item['slug'])]
        item['evidence'] = evidencelist
        return item



#====================CURSEDITEM====================
class CursedItemlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = CursedItem
        fields = ['slug', 'name', 'image1']

class CursedItemSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = CursedItem
        exclude = ['created_at', 'order']
    def to_representation(self, obj):
        item = super().to_representation(obj)
        item['updated_at'] = relative_time(item['updated_at'])
        return item



#====================GAMEMAP====================
class MaplistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = ['slug', 'name', 'name_en', 'mapsize', 'number', 'building', 'image1', 'image2']

class MapSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Map
        exclude = ['created_at', 'order']
    def to_representation(self, obj):
        item = super().to_representation(obj)
        item['updated_at'] = relative_time(item['updated_at'])
        item['floorBy'] = [{
            'name': i.name,
            'image': str(i.image),
            "a":"a"}
            for i in FloorByMap.objects.filter(maps=item['slug']).order_by('order')]
        item['room'] = [{
            'index': i.order,
            'name': i.name,
            'name_en': i.name_en,
            'image1': str(i.image1).replace('\\', '/'),}
            for i in GhostRoom.objects.filter(maps=item['slug']).order_by('order')]
        
        return item



#====================EVIDENCE====================
class EvidencelistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evidence
        fields = ['slug', 'name']

class EvidenceSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    identifiable = serializers.CharField(read_only=True)
    class Meta:
        model = Evidence
        exclude = ['created_at', 'order']
    def to_representation(self, obj):
        item = super().to_representation(obj)
        item['updated_at'] = relative_time(item['updated_at'])
        identifiablelist = [{
            'slug' : i.equipment.slug,
            'name' : i.equipment.name,
            'image1' : str(i.equipment.image1).replace('\\', '/'),
            'text': i.text}
            for i in Identifiable.objects.filter(evidence=item['slug'])]
        item['identifiable'] = identifiablelist

        item['ghost'] = [{
            'slug': i.ghost.slug,
            'name': i.ghost.name,
            'level': i.ghost.level,}
            for i in EvidencePossibility.objects.filter(evidence=item['slug'], possibility=100)]
        return item




#====================POST====================
def relative_time(time) -> str:
        '''1970-1-01T01:00:00.000000+00:00'''
        ret = ''
        try:
            timestamp_at = int(datetime.datetime.strptime(
                time[:18], '%Y-%m-%dT%H:%M:%S').timestamp())
            reltime = int(timezone.now().timestamp()) - timestamp_at
            if reltime < 60:
                ret = '数秒前'
            elif reltime < 3600:
                ret = str(reltime // 60) + '分前'
            elif reltime < 86400:
                ret = str(reltime // 3600) + '時間前'
            elif reltime < 604800:
                ret = str(reltime // 86400) + '日前'
            else:
                ret = f'{int(time[:4])}/{int(time[5:7])}/{int(time[8:10])}'
        except: pass
        return ret


def post_format(item, ipuser, target) -> dict:
    item['edit'] = item['created_at'] != item['updated_at']
    item['created_at'] = relative_time(item['created_at'])
    item['favorited'] = False
    if target == 'P':
        if Favorite.objects.filter(target_P=item['slug'], ipuser=ipuser):
            item['favorited'] = True
    elif target == 'C':
        if Favorite.objects.filter(target_C=item['slug'], ipuser=ipuser):
            item['favorited'] = True
    elif target == 'A':
        if Favorite.objects.filter(target_A=item['slug'], ipuser=ipuser):
            item['favorited'] = True
    if item['user']:
        user = User.objects.get(pk=item['user'])
        item['display'] = user.display
        item['icon'] = '/media/' + str(user.icon).replace('\\', '/')
    else: item['icon'] = f'/media/default_user_icon/icon{item["icon"]}.png'

    del item[ 'updated_at']
    # comment only
    try: item.pop('target')
    except: pass
    return item


class PostlistSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    commentSum = serializers.IntegerField(read_only=True)
    favoriteSum = serializers.IntegerField(read_only=True)
    class Meta:
        model = Post
        fields = '__all__'
    def to_representation(self, obj):
        item = super().to_representation(obj)
        ipuser, _ = self.context["ipuser"]
        ret = post_format(item, ipuser, 'P')
        return ret

class PostSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    image1 = serializers.ImageField(use_url=True)
    image2 = serializers.ImageField(use_url=True)
    image3 = serializers.ImageField(use_url=True)
    image4 = serializers.ImageField(use_url=True)
    class Meta:
        model = Post
        fields = '__all__'

class CommentlistSerializer(serializers.ModelSerializer):
    favoriteSum = serializers.IntegerField(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
    def to_representation(self, obj):
        item = super().to_representation(obj)
        ipuser, _ = self.context["ipuser"]
        ret = post_format(item, ipuser, 'C')
        return ret



#====================ARTICLE====================
class ArticlelistSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    favoriteSum = serializers.IntegerField(read_only=True)
    class Meta:
        model = Article
        exclude = ['image2', 'text']
    def to_representation(self, obj):
        item = super().to_representation(obj)
        ipuser, _ = self.context["ipuser"]
        ret = post_format(item, ipuser, 'A')
        return ret

class ArticleSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    favoriteSum = serializers.IntegerField(read_only=True)
    class Meta:
        model = Article
        fields = '__all__'
    def to_representation(self, obj):
        item = super().to_representation(obj)
        ipuser, _ = self.context["ipuser"]
        ret = post_format(item, ipuser, 'A')
        return ret



    #####  #####  #####  #
      #    #   #  #   #  #
      #    #   #  #   #  #
      #    #####  #####  #####
#====================CUSTOMDIFFICULTY====================
class CustomDifficultySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomDifficultyItem
        exclude = ['order']
    def to_representation(self, obj):
        item = super().to_representation(obj)
        valuelist = [{
            'value': i.value,
            'magn': i.magnification,
            'order': i.order,
            }
            for i in CustomDifficultyValue.objects.filter(item=item['id'])]
        item['value'] = valuelist
        return item

class CustomDifficultyPresetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomDifficultyPreset
        fields = ['name', 'params', 'image']



#====================IDENTIFICATION====================
class IdentificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        exclude = ['order']

class ByGhostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ghost
        fields = ['slug']


    def to_representation(self, obj):
        item = super().to_representation(obj)
        ghost = item['slug']
        FePoss = FeaturePossibility.objects.filter(ghost=ghost)
        EvPoss = EvidencePossibility.objects.filter(ghost=ghost)
        #証拠と特徴の倍率を結合
        byEvidence = {}
        byFeature = {}
        for ev in EvPoss:
            byEvidence[ev.evidence.pk] = ev.possibility
        for fe in FePoss:
            byFeature[fe.feature.pk] = fe.possibility

        item['factor'] = {**byEvidence, **byFeature}

        return item