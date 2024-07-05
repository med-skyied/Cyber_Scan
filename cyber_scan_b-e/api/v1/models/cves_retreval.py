#!/usr/bin/env python3
""" this is a module to retrieve CVEs list from a github repo,
    the used repo is a part of the officialCVEproject """

import requests
import os


def cve_retreive(provided_year):
    """ retreive the cves list searchis done by year"""

    base_github_url = 'https://github.com/cve_project'
    print(base_github_url)


if __name__ == "__main__":
    """ direct invocation """
    provided_year = '2003'
    cve_retreive(provided_year)
