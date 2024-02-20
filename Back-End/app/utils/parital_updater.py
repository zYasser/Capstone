import logging


def update_object(old_object, new_object):
    for attr, value in new_object.__dict__.items():
        setattr(old_object, attr, value)
