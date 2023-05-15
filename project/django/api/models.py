from taggit.models import CommonGenericTaggedItemBase, TaggedItemBase
from django.contrib.auth.models import AbstractUser
from taggit.managers import TaggableManager
from django_cleanup import cleanup #@cleanup.ignore
from django.db import models
import random
import uuid


#TAGGIT
class GenericStringTaggedItem(CommonGenericTaggedItemBase, TaggedItemBase):
    object_id = models.CharField(max_length=100, verbose_name=('Object id'), db_index=True)



#画像パスUUID化(未使用, 本番までには実装)
def image_directory_path(instance, filename):
    return f'{str(uuid.uuid4())}.{filename.split(".")[-1]}'



#デフォルトアイコン
def random_string():
    return f'default_user_icon\\icon{random.randint(1, 12)}.png'
#ユーザー
class User(AbstractUser):
    username     = models.SlugField('ユーザーID' ,max_length=12, unique=True, primary_key=True)
    display      = models.CharField('表示名' ,max_length=12, unique=False, null=True, blank=False)
    icon         = models.ImageField('アイコン' ,upload_to='user_icon', null=True, default=random_string)
    introduction = models.TextField('自己紹介', max_length=255, null=True, blank=True)



#アラート
class Alert(models.Model):
    SEVERITY_TYPE = (
        ('error', 'error'),
        ('warning', 'warning'),
        ('info', 'info'),
        ('success', 'success')
    )
    severity = models.CharField('重大度', max_length=12, choices=SEVERITY_TYPE)
    message  = models.CharField('メッセージ', max_length=255, null=True, blank=True)
    show     = models.BooleanField('表示', null=True, default=True)
    class Meta:
        verbose_name = verbose_name_plural = 'アラート'
    def __str__(self):
        return f'({self.severity}){self.message}'



#スライドショー
class SlideShow(models.Model):
    title      = models.CharField('タイトル', max_length=12, null=True, blank=True)
    text       = models.CharField('テキスト', max_length=50, null=True, blank=True)
    background = models.ImageField('背景' ,upload_to='slideshow_image', null=True, blank=True)
    link_to    = models.CharField('相対URL', max_length=255, null=True, blank=True)
    show       = models.BooleanField('表示', null=True, default=True)
    class Meta:
        verbose_name = verbose_name_plural = 'スライドショー'
    def __str__(self):
        return f'{self.title} : {self.text}'



#バージョン
class Version(models.Model):
    slug = models.SlugField('スラグ', primary_key=True)
    name = models.CharField('名前', max_length=100, null=True, blank=True)
    date = models.DateField('リリース日', null=True, blank=False)
    text = models.TextField('マークダウンテキスト',  max_length=10_000, null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'バージョン'
    def __str__(self):
        return self.name



#投稿
class Post(models.Model):
    slug       = models.SlugField('スラグ', default=uuid.uuid4, primary_key=True, editable=False)
    user       = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    display    = models.CharField('表示名(未ログインユーザー)' ,max_length=12, unique=False, null=True, blank=True)
    icon       = models.SmallIntegerField('アイコン(未ログインユーザー)', null=True, blank=True)
    text       = models.TextField('本文', max_length=255, null=False, blank=False)
    image1     = models.ImageField('画像1', upload_to='post_image', null=True ,blank=True)
    image2     = models.ImageField('画像2', upload_to='post_image', null=True ,blank=True)
    image3     = models.ImageField('画像3', upload_to='post_image', null=True ,blank=True)
    image4     = models.ImageField('画像4', upload_to='post_image', null=True ,blank=True)
    tags       = TaggableManager('タグ', blank=True, through=GenericStringTaggedItem)
    created_at = models.DateTimeField('作成日', auto_now_add=True)
    updated_at = models.DateTimeField('更新日', auto_now=True)
    class Meta:
        verbose_name = verbose_name_plural = '投稿'
    def __str__(self):
        return f'({self.created_at}){self.text[:10]}'



#コメント
class Comment(models.Model):
    slug       = models.SlugField('スラグ', default=uuid.uuid4, primary_key=True, editable=False)
    target     = models.ForeignKey(Post, on_delete=models.CASCADE)
    user       = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    display    = models.CharField('表示名(未ログインユーザー)' ,max_length=12, unique=False, null=True, blank=True)
    icon       = models.SmallIntegerField('アイコン(未ログインユーザー)', null=True, blank=True)
    text       = models.TextField('本文', max_length=255, null=False, blank=False)
    image1     = models.ImageField('画像1', upload_to='post_image', null=True ,blank=True)
    image2     = models.ImageField('画像2', upload_to='post_image', null=True ,blank=True)
    image3     = models.ImageField('画像3', upload_to='post_image', null=True ,blank=True)
    image4     = models.ImageField('画像4', upload_to='post_image', null=True ,blank=True)
    created_at = models.DateTimeField('作成日', auto_now_add=True)
    updated_at = models.DateTimeField('更新日', auto_now=True)
    class Meta:
        verbose_name = verbose_name_plural = 'コメント'
    def __str__(self):
        return f'({self.created_at}){self.text[:10]}'



#記事
class Article(models.Model):
    slug       = models.SlugField('スラグ', default=uuid.uuid4, primary_key=True, editable=False)
    user       = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title      = models.CharField('タイトル', max_length=50, null=True, blank=False)
    subtitle   = models.CharField('サブタイトル', max_length=50, null=True, blank=False)
    image1     = models.ImageField('画像1', upload_to='article_image', null=True ,blank=True)
    image2     = models.ImageField('画像2', upload_to='article_image', null=True ,blank=True)
    text       = models.TextField('マークダウンテキスト', max_length=10_000, null=True, blank=False)
    tags       = TaggableManager('関連タグ', blank=True, through=GenericStringTaggedItem)
    created_at = models.DateTimeField('作成日', auto_now_add=True)
    updated_at = models.DateTimeField('更新日', auto_now=True)
    version    = models.ForeignKey(Version, on_delete=models.SET_NULL, null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = '記事'
    def __str__(self):
        return f'{self.title} : {self.subtitle}'



#お気に入り
class Favorite(models.Model):
    # IP User
    # user       = models.ForeignKey(User, on_delete = models.CASCADE)
    ipuser       = models.CharField('ipuser',  max_length=50, null=True, blank=False)
    target_P     = models.ForeignKey(Post, on_delete = models.CASCADE, null=True, blank=True)
    target_C     = models.ForeignKey(Comment, on_delete = models.CASCADE, null=True, blank=True)
    target_A     = models.ForeignKey(Article, on_delete = models.CASCADE, null=True, blank=True)
    created_date = models.DateTimeField('作成日', auto_now=True)
    class Meta:
        verbose_name = verbose_name_plural = 'お気に入り'
    def __str__(self):
        return f'({self.created_date}){self.ipuser}'



#証拠
class Evidence(models.Model):
    slug       = models.SlugField('スラグ', primary_key=True)
    name       = models.CharField('名前', max_length=100, null=True, blank=True)
    name_en    = models.CharField('英名', max_length=100, null=True, blank=True)
    image1     = models.ImageField('画像1', upload_to='evidence_image', null=True ,blank=True)
    image2     = models.ImageField('画像2', upload_to='evidence_image', null=True ,blank=True)
    explanation = models.TextField('説明', max_length=255, null=True, blank=True)
    text       = models.TextField('マークダウンテキスト', max_length=10_000, null=True, blank=True)
    tags       = TaggableManager('関連タグ', blank=True, through=GenericStringTaggedItem)
    created_at = models.DateTimeField('作成日', auto_now_add=True)
    updated_at = models.DateTimeField('更新日', auto_now=True)
    version    = models.ForeignKey(Version, on_delete=models.SET_NULL, null=True, blank=True)
    order      = models.IntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = '証拠'
    def __str__(self):
        return self.name



#ゴースト
class Ghost(models.Model):
    slug        = models.SlugField('スラグ', primary_key=True)
    name        = models.CharField('名前', max_length=100, null=True, blank=True)
    name_en     = models.CharField('英名', max_length=100, null=True, blank=True)
    level       = models.SmallIntegerField('危険度', null=True, blank=True)
    acceleration_v = models.BooleanField('視認加速', null=True, default=True)
    acceleration_d = models.BooleanField('ダッシュ加速', null=True, default=True)
    image1      = models.ImageField('画像1', upload_to='ghost_image', null=True ,blank=True)
    image2      = models.ImageField('画像2', upload_to='ghost_image', null=True ,blank=True)
    explanation = models.TextField('説明', max_length=255, null=True, blank=True)
    text        = models.TextField('マークダウンテキスト', max_length=10_000, null=True, blank=True)
    tags        = TaggableManager('関連タグ', blank=True, through=GenericStringTaggedItem)
    created_at  = models.DateTimeField('作成日', auto_now_add=True)
    updated_at  = models.DateTimeField('更新日', auto_now=True)
    version     = models.ForeignKey(Version, on_delete=models.SET_NULL, null=True, blank=True)
    order       = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'ゴースト'
    def __str__(self):
        return self.name



#ハントライン
class HuntLine(models.Model):
    ghost  = models.ForeignKey(Ghost, on_delete=models.CASCADE)
    text   = models.CharField('状況', max_length=100, null=True, blank=True)
    sanity = models.FloatField('正気度(%)', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'ハントライン'
    def __str__(self):
        return f'{self.ghost} : {self.text}({self.sanity})'



#証拠可能性
class EvidencePossibility(models.Model):
    ghost       = models.ForeignKey(Ghost, on_delete=models.CASCADE)
    evidence    = models.ForeignKey(Evidence, on_delete=models.CASCADE)
    possibility = models.SmallIntegerField('可能性0~100', null=True, blank=True)
    confirm     = models.BooleanField('確定', null=True, default=False)
    class Meta:
        verbose_name = verbose_name_plural = '証拠可能性'
    def __str__(self):
        return f'{self.ghost} : {self.evidence}({self.possibility}%)'
    


#スピード
class Speed(models.Model):
    ghost     = models.ForeignKey(Ghost, on_delete=models.CASCADE)
    situation = models.CharField('状況', max_length=100, null=True, blank=True)
    value     = models.FloatField('速度(m/s)', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'ゴーストの速度'
    def __str__(self):
        return f'{self.ghost} : {self.value}({self.situation})'




#呪いのアイテム
class CursedItem(models.Model):
    slug        = models.SlugField('スラグ', primary_key=True)
    name        = models.CharField('名前', max_length=100, null=True, blank=True)
    name_en     = models.CharField('英名', max_length=100, null=True, blank=True)
    image1      = models.ImageField('画像1', upload_to='curseditem_image', null=True ,blank=True)
    image2      = models.ImageField('画像2', upload_to='curseditem_image', null=True ,blank=True)
    explanation = models.TextField('説明', max_length=255, null=True, blank=True)
    text        = models.TextField('マークダウンテキスト', null=True, blank=True)
    tags        = TaggableManager('関連タグ', blank=True, through=GenericStringTaggedItem)
    created_at  = models.DateTimeField('作成日', auto_now_add=True)
    updated_at  = models.DateTimeField('更新日', auto_now=True)
    version     = models.ForeignKey(Version, on_delete=models.SET_NULL, null=True, blank=True)
    order       = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = '呪いのアイテム'
    def __str__(self):
        return self.name



# 特徴タイプ
class FeatureType(models.Model):
    name  = models.CharField('名前', max_length=100, null=True, blank=True)
    help  = models.CharField('ヘルプ', max_length=255, null=True, blank=True)
    curse = models.ForeignKey(CursedItem, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'ゴーストの特徴タイプ'
    def __str__(self):
        return self.name



# 特徴
class Feature(models.Model):
    #例: ブレーカーを落とした
    feature_type = models.ForeignKey(FeatureType, on_delete=models.SET_NULL, null=True, blank=True)
    text  = models.CharField('特徴(ツール用)', max_length=100, null=True, blank=True)
    help  = models.CharField('ヘルプ', max_length=255, null=True, blank=True)
    order = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'ゴーストの特徴'
    def __str__(self):
        return self.text



# ゴースト別特徴可能性
class FeaturePossibility(models.Model):
    ghost       = models.ForeignKey(Ghost, on_delete=models.CASCADE)
    feature     = models.ForeignKey(Feature, on_delete=models.CASCADE)
    #例: text: ブレーカーを落とさない　可能性: 0 ~ 1
    text        = models.CharField('特徴(表示用)', max_length=100, null=True, blank=True)
    possibility = models.SmallIntegerField('可能性', null=True, blank=True)
    page_on     = models.BooleanField('ページに表示', null=True, default=True)
    class Meta:
        verbose_name = verbose_name_plural = 'ゴースト別特徴可能性'
    def __str__(self):
        return f'{self.ghost} : {self.feature} ({self.possibility})'



#装備タイプ
class EquipmentType(models.Model):
    slug  = models.SlugField('スラグ', primary_key=True)
    name  = models.CharField('名前', max_length=100, null=True, blank=True)
    order = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = '装備タイプ'
    def __str__(self):
        return self.name



#装備
class Equipment(models.Model):
    slug           = models.SlugField('スラグ', primary_key=True)
    name           = models.CharField('名前', max_length=100, null=True, blank=True)
    name_en        = models.CharField('英名', max_length=100, null=True, blank=True)
    equipment_type = models.ForeignKey(EquipmentType, on_delete=models.SET_NULL, null=True, blank=True)
    price          = models.SmallIntegerField('価格', null=True, blank=True)
    price_s        = models.SmallIntegerField('売価', null=True, blank=True)
    limit_up       = models.SmallIntegerField('持込上限数', null=True, blank=True)
    limit_low      = models.SmallIntegerField('持込下限数', null=True, blank=True)
    image1         = models.ImageField('画像1', upload_to='equipment_image', null=True ,blank=True)
    image2         = models.ImageField('画像2', upload_to='equipment_image', null=True ,blank=True)
    explanation    = models.TextField('説明', max_length=255, null=True, blank=True)
    text           = models.TextField('マークダウンテキスト', null=True, blank=True)
    tags           = TaggableManager('関連タグ', blank=True, through=GenericStringTaggedItem)
    created_at     = models.DateTimeField('作成日', auto_now_add=True)
    updated_at     = models.DateTimeField('更新日', auto_now=True)
    version        = models.ForeignKey(Version, on_delete=models.SET_NULL, null=True, blank=True)
    order          = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = '装備'
    def __str__(self):
        return self.name



#特定可能な証拠
class Identifiable(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    evidence = models.ForeignKey(Evidence, on_delete=models.CASCADE)
    text     = models.TextField('簡易説明', max_length=255, null=True, blank=True) # 未使用
    class Meta:
        verbose_name = verbose_name_plural = '特定可能な証拠'
    def __str__(self):
        return f'{self.equipment} : {self.evidence}'



#マップ
class Map(models.Model):
    slug        = models.SlugField('スラグ', primary_key=True)
    name        = models.CharField('名前', max_length=100, null=True, blank=True)
    name_en     = models.CharField('英名', max_length=100, null=True, blank=True)
    mapsize     = models.CharField('サイズ', max_length=10, null=True, blank=True)
    number      = models.SmallIntegerField('推奨人数', null=True, blank=True)
    building    = models.CharField('建物', max_length=100, null=True, blank=True)
    ghostroom_sum = models.SmallIntegerField('ゴーストルーム数', null=True, blank=True)
    floor       = models.SmallIntegerField('階数', null=True, blank=True)
    image1      = models.ImageField('画像1', upload_to='map_image', null=True ,blank=True)
    image2      = models.ImageField('画像2', upload_to='map_image', null=True ,blank=True)
    explanation = models.TextField('説明', max_length=255, null=True, blank=True)
    text        = models.TextField('マークダウンテキスト', null=True, blank=True)
    tags        = TaggableManager('関連タグ', blank=True, through=GenericStringTaggedItem)
    created_at  = models.DateTimeField('作成日', auto_now_add=True)
    updated_at  = models.DateTimeField('更新日', auto_now=True)
    version     = models.ForeignKey(Version, on_delete=models.SET_NULL, null=True, blank=True)
    order       = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'マップ'
    def __str__(self):
        return self.name



# 階層別
class FloorByMap(models.Model):
    maps  = models.ForeignKey(Map, on_delete=models.CASCADE, null=True, blank=True)
    name  = models.CharField('名前', max_length=100, null=True, blank=True)
    image = models.ImageField('画像', upload_to='map_image', null=True ,blank=True)
    order = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = '階層別'
    def __str__(self):
        return self.name



# ゴーストルーム
class GhostRoom(models.Model):
    maps    = models.ForeignKey(Map, on_delete=models.CASCADE, null=True, blank=True)
    name    = models.CharField('名前', max_length=100, null=True, blank=True)
    name_en = models.CharField('英名', max_length=100, null=True, blank=True)
    image1  = models.ImageField('画像1', upload_to='map_image', null=True ,blank=True)
    image2  = models.ImageField('画像2', upload_to='map_image', null=True ,blank=True)
    order   = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'ゴーストルーム'
    def __str__(self):
        return self.name



#カスタム難易度タイプ
class CustomDifficultyType(models.Model):
    slug  = models.SlugField('スラグ', primary_key=True)
    name  = models.CharField('名前', max_length=32, null=True, blank=True)
    help  = models.CharField('ヘルプ', max_length=255, null=True, blank=True)
    order = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'カスタム難易度タイプ'
    def __str__(self):
        return self.name



#カスタム難易度項目
class CustomDifficultyItem(models.Model):
    difficulty_type = models.ForeignKey(CustomDifficultyType,on_delete=models.SET_NULL, null=True, blank=True)
    name       = models.CharField('名前', max_length=32, null=True, blank=True)
    text       = models.CharField('説明', max_length=100, null=True, blank=True)
    default     = models.SmallIntegerField('値の初期値', null=True, blank=True)
    hide_order = models.CharField('対象のid,非表示にする値のorder1,非表示にする値のorder2...', max_length=144, null=True, blank=True)
    order      = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'カスタム難易度項目'
    def __str__(self):
        return self.name



#カスタム難易度値
class CustomDifficultyValue(models.Model):
    item  = models.ForeignKey(CustomDifficultyItem, on_delete=models.CASCADE)
    value = models.CharField('値', max_length=12, null=True, blank=True)
    magnification = models.FloatField('倍率(初期値1.0)', null=True, blank=True)
    order = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'カスタム難易度値'
    def __str__(self):
        return f'{self.item} : {self.value}'



#カスタム難易度プリセット
class CustomDifficultyPreset(models.Model):
    name   = models.CharField('名前', max_length=32, null=True, blank=True)
    image  = models.ImageField('画像', upload_to='tool_image', null=True ,blank=True)
    params =  models.CharField('パラメータ(?&)',max_length=1000, null=True, blank=True)
    order  = models.SmallIntegerField('表示順', null=True, blank=True)
    class Meta:
        verbose_name = verbose_name_plural = 'カスタム難易度プリセット'
    def __str__(self):
        return self.name