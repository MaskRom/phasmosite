from django.contrib import admin
from .models import *


admin.site.site_title = 'Phasmophobia日本語コミュニティ管理画面'
admin.site.site_header = '管理画面' 
admin.site.index_title = 'メニュー'



@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Favorite)
admin.site.register(Version)
admin.site.register(Evidence)
admin.site.register(EquipmentType)
admin.site.register(CursedItem)
admin.site.register(Article)
admin.site.register(Alert)
admin.site.register(SlideShow)
admin.site.register(CustomDifficultyType)



# ゴースト
class EvidencePossibilityInline(admin.TabularInline):
    model = EvidencePossibility
    extra = 3
class HuntLineInline(admin.TabularInline):
    model = HuntLine
    extra = 1
class SpeedInline(admin.TabularInline):
    model = Speed
    extra = 1
class FeaturePossibilityInline(admin.StackedInline):
    model = FeaturePossibility
    extra = 1
class GhostAdmin(admin.ModelAdmin):
    list_filter = ['level']
    list_display = ('order', 'name', 'name_en','level','version')
    inlines = [EvidencePossibilityInline,HuntLineInline, SpeedInline, FeaturePossibilityInline]
admin.site.register(Ghost, GhostAdmin)



# マップ
class GhostRoomInline(admin.StackedInline):
    model = GhostRoom
    extra = 1
class FloorByMapInline(admin.StackedInline):
    model = FloorByMap
    extra = 1
class MapAdmin(admin.ModelAdmin):
    list_filter = ['mapsize', 'number']
    list_display = ('order', 'name','mapsize', 'number', 'building', 'ghostroom_sum', 'floor')
    inlines = [FloorByMapInline, GhostRoomInline]
admin.site.register(Map, MapAdmin)



# 装備
class IdentifiableInline(admin.StackedInline):
    model = Identifiable
    extra = 1
class EquipmentAdmin(admin.ModelAdmin):
    list_filter = ['equipment_type']
    list_display = ('order', 'equipment_type', 'name', 'version')
    inlines = [IdentifiableInline]
admin.site.register(Equipment, EquipmentAdmin)



# ゴースト別特徴タイプ
class FeatureTypeInline(admin.TabularInline):
    model = Feature
    extra = 1
class FeatureTypeAdmin(admin.ModelAdmin):
    list_display = ('order', 'name')
    inlines = [FeatureTypeInline]

admin.site.register(FeatureType, FeatureTypeAdmin)



# ゴーストの特徴
class FeatureAdmin(admin.ModelAdmin):
    list_filter = ['feature_type']
    list_display = ('order', 'text')
admin.site.register(Feature, FeatureAdmin)



# カスタム難易度
class CustomDifficultyValueInline(admin.TabularInline):
    model = CustomDifficultyValue
    extra = 5
class CustomDifficultyItemAdmin(admin.ModelAdmin):
    list_filter = ['difficulty_type']
    list_display = ('id', 'order', 'name', 'difficulty_type')
    inlines = [CustomDifficultyValueInline]
admin.site.register(CustomDifficultyItem, CustomDifficultyItemAdmin)



# カスタム難易度プリセット
class CustomDifficultyPresetAdmin(admin.ModelAdmin):
    list_display = ('order', 'name')
admin.site.register(CustomDifficultyPreset, CustomDifficultyPresetAdmin)