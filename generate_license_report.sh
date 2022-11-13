#!/usr/bin/env bash

license-checker --csv | sed -E "s|\/.*(\/prescient.*)|\1|g"  > license_report.csv