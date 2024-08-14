#!/bin/bash
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

DEPLOY=("main")

for i in "${DEPLOY[@]}"
do
  if [[ $i == $VERCEL_GIT_COMMIT_REF ]]
  then
    # exit 1 allows the build to proceed
    echo "✅ - Build can proceed"
    exit 1;
  fi
done

# Don't build
echo "🛑 - Build cancelled"
exit 0;