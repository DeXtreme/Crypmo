# Generated by Django 4.0 on 2022-02-24 02:22

from django.db import migrations, models
import django.db.models.expressions
import django.db.models.functions.datetime


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0002_trade_trade_idx'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='trade',
            name='trade_idx',
        ),
        migrations.AddIndex(
            model_name='trade',
            index=models.Index(django.db.models.expressions.F('coin'), django.db.models.functions.datetime.TruncDate('created_at'), name='trade_date_idx'),
        ),
        migrations.AddIndex(
            model_name='trade',
            index=models.Index(django.db.models.expressions.F('coin'), django.db.models.expressions.OrderBy(django.db.models.expressions.F('created_at'), descending=True), name='trade_latest_idx'),
        ),
    ]