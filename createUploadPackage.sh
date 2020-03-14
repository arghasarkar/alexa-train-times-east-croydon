#!/usr/bin/env bash

# Delete existing skill.zip file
rm skill.zip

# Create new skill.zip file
echo "Starting to zip files..."
zip -r skill.zip ./* > /dev/null 2>&1
echo "Skill.zip file created."
