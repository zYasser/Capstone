import logging
import sys


def configure_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s - %(name)s - %(funcName)s() - %(levelname)s -] - %(message)s ",
        handlers=[logging.StreamHandler(sys.stdout)],
    )
